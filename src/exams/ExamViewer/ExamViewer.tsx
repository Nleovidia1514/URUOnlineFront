import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Divider,
  Form,
  Grid,
  Row,
  Schema,
} from 'rsuite';
import Input from '../../core/components/controls/Input';
import {
  DeliveredExam,
  DeliveredExamAnswer,
} from '../../core/models/DeliveredExam.model';
import {
  addExamQuestion,
  createDeliveredExamAction,
  getExamsAction,
} from '../../store/actions/exam.actions';
import { AppState } from '../../store/reducers';
import ExamQuestion from './ExamQuestion/ExamQuestion';

const { StringType, ArrayType, NumberType, BooleanType } = Schema.Types;
const model = Schema.Model({
  label: StringType('Por favor ingrese un enunciado valido.')
    .isRequired('Este campo es obligatorio.')
    .maxLength(1000),
  type: StringType('Por favor ingrese un tipo valido')
    .isRequired('Este campo es obligatorio.')
    .maxLength(100),
  options: ArrayType('Por favor ingrese opciones validas'),
  order: NumberType('Por favor ingrese un numero valido').isRequired(
    'Este campo es obligatorio.'
  ),
});

const questionTypes = [
  {
    label: 'Texto',
    value: 'textarea',
  },
  {
    label: 'Seleccion multiple',
    value: 'select',
  },
  {
    label: 'Verdadero y falso',
    value: 'boolean',
  },
];

interface ExamViewerProps {
  fetchExam?: boolean;
  readonly?: boolean;
}

export default forwardRef(({ fetchExam = true, readonly }: ExamViewerProps, ref) => {
  const dispatch = useDispatch();
  const currentExam = useSelector((state: AppState) => state.exams.currentExam);
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const loading = useSelector((state: AppState) => state.exams.loading);

  const initialValue = {
    label: '',
    type: '',
    options: [],
    order: 1,
  };
  const [formValue, setFormValue] = useState(initialValue);
  const form = useRef<any>(null);

  const [answerFormValue, setAnswerFormValue] = useState({});
  const [answerModel, setAnswerModel] = useState({});
  const answerForm = useRef<any>(null);

  useEffect(() => {
    const auxModel = {};

    currentExam?.questions.forEach((x) => {
      switch (x.type) {
        case 'select':
        case 'textarea':
          auxModel[x.order] = StringType(
            'Por favor ingrese una respuesta valida'
          ).isRequired('Este campo es obligatorio.');
          break;
        case 'boolean':
          auxModel[x.order] = BooleanType(
            'Por favor ingrese una respuesta valida'
          ).isRequired('Este campo es obligatorio');
          break;
        default:
          break;
      }
    });
    setAnswerModel(auxModel);
  }, [currentExam]);

  const { id } = useParams() as any;

  useEffect(() => {
    if (!fetchExam) return;
    dispatch(getExamsAction(id));
  }, [dispatch, id, fetchExam]);

  const saveExamQuestion = useCallback(() => {
    if (form.current.check()) {
      if (formValue.type === 'boolean') {
        dispatch(
          addExamQuestion({
            ...formValue,
            type: 'select',
            options: ['Verdadero', 'Falso'],
            exam: currentExam?._id,
          })
        );
      } else {
        dispatch(
          addExamQuestion({
            ...formValue,
            exam: currentExam?._id,
          })
        );
      }
      setFormValue(initialValue);
    }
  }, [dispatch, formValue, currentExam, initialValue]);

  useImperativeHandle(ref, () => ({
    sendExamAnswers: () => {
      if (answerForm.current.check() && answerFormValue !== undefined) {
        const answers: DeliveredExamAnswer[] = [];
        for (const key in answerFormValue) {
          const element = answerFormValue[key];
          answers.push({
            question: parseInt(key),
            value: element,
          });
        }
        const delivered = {
          exam: currentExam._id,
          owner: currentUser._id,
          answers,
        } as DeliveredExam;
        dispatch(createDeliveredExamAction(delivered));
      }
    },
    setExamAnswers: (answers: DeliveredExamAnswer[]) => {
      const answerValue = {};
      answers.forEach((a) => {
        answerValue[a.question] = a.value;
      });

      setAnswerFormValue(answerValue);
    },
  }));

  return (
    <Container>
      <h1>{currentExam?.name}</h1>
      <Divider />
      {currentUser?.type === 'professor' && !readonly ? (
        <>
          <Form
            ref={form}
            onChange={setFormValue}
            formValue={formValue}
            model={model}
            fluid
          >
            <Grid>
              <Row style={{ marginBottom: 30 }}>
                <Col sm={6}>
                  <Input
                    label='Enunciado'
                    name='label'
                    type='textarea'
                    rows={5}
                  />
                </Col>
                <Col sm={5} smOffset={1}>
                  <Input
                    label='Tipo'
                    name='type'
                    type='select'
                    data={questionTypes}
                  />
                </Col>
                {formValue.type === 'select' ? (
                  <Col sm={5} smOffset={1}>
                    <Input
                      label='Opciones'
                      name='options'
                      type='tags'
                      data={[]}
                      placeholder='Agregue opciones'
                    />
                  </Col>
                ) : null}
                <Col sm={4} smOffset={1}>
                  <Input label='Orden' name='order' type='number' />
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <Button
                    color='blue'
                    onClick={saveExamQuestion}
                    loading={loading}
                    block
                  >
                    Agregar pregunta
                  </Button>
                </Col>
                <Col sm={4} smOffset={1}>
                  <Button
                    color='red'
                    onClick={() => setFormValue(initialValue)}
                    block
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Form>
          <Divider />
        </>
      ) : null}
      <Form
        ref={answerForm}
        model={Schema.Model(answerModel)}
        onChange={setAnswerFormValue}
        formValue={answerFormValue}
        fluid
      >
        {currentExam?.questions
          .sort((a, b) => a.order - b.order)
          .map((x, index) => (
            <ExamQuestion
              readonly={readonly}
              key={index}
              question={x}
              editable={currentUser?._id === currentExam.creator && !readonly}
            />
          ))}
      </Form>
    </Container>
  );
});
