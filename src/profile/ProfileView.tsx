import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Container, Divider, FlexboxGrid } from 'rsuite';
import VerifyCodeModal from '../auth/VerifyCodeModal/VerifyCodeModal';
import ImageUploader from '../core/components/controls/ImageUploader';
import environment from '../core/environment';
import {
  loginUserSuccessAction,
  sendVerificationCodeAction,
  updateUserAction,
} from '../store/actions/auth.actions';
import { AppState } from '../store/reducers';
import BasicInfoForm from './BasicInfoForm/BasicInfoForm';
import ExternalLinksForm from './ExternalLinksForm/ExternalLinksForm';
import SecurityForm from './SecurityForm/SecurityForm';

export default () => {
  const loading = useSelector((state: AppState) => state.auth.loading);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const [showVerify, setShowVerify] = useState(false);
  const [basicInfoValue, setBasicInfoValue] = useState({
    email: currentUser.email,
    name: currentUser.name,
    lastname: currentUser.lastname,
    phoneNumber: currentUser.phoneNumber,
    birthdate: new Date(currentUser.birthdate),
  });
  const [securityInfoValue, setSecurityInfoValue] = useState({
    password: '',
    verifyPassword: '',
    mfa: currentUser.mfa,
  });
  const [externalLinksValue, setExternalLinksValue] = useState({
    githubLink: currentUser.githubLink,
  });

  const sendVerificationCode = useCallback(() => {
    dispatch(sendVerificationCodeAction(basicInfoValue.phoneNumber));
    setShowVerify(true);
  }, [dispatch, basicInfoValue.phoneNumber]);

  const saveChanges = useCallback(
    (changes = {}) => {
      dispatch(
        updateUserAction({
          ...currentUser,
          ...basicInfoValue,
          ...externalLinksValue,
          ...changes,
        })
      );
      setShowVerify(false);
    },
    [dispatch, currentUser, basicInfoValue, externalLinksValue]
  );

  const isDifferent = useCallback(
    (value) => {
      let different = false;
      for (const key in value) {
        if (key === 'birthdate') {
          different =
            value[key].getTime() !== new Date(currentUser[key]).getTime();
        } else {
          different = value[key] !== currentUser[key];
        }
        if (different) break;
      }

      return different;
    },
    [currentUser]
  );

  const onSuccessImgUpload = useCallback(
    (response) => {
      Alert.success('Imagen actualizada con exito.');
      dispatch(loginUserSuccessAction(response));
    },
    [dispatch]
  );

  const onClickSave = useCallback(() => {
    if (basicInfoValue.phoneNumber !== currentUser.phoneNumber) {
      sendVerificationCode();
    } else {
      saveChanges();
    }
  }, [
    basicInfoValue.phoneNumber,
    currentUser.phoneNumber,
    saveChanges,
    sendVerificationCode,
  ]);

  return (
    <Container style={{ width: '100%' }}>
      <VerifyCodeModal
        title='Verificacion de nuevo telefono'
        show={showVerify}
        onSuccessVerify={saveChanges}
        phoneNumber={basicInfoValue.phoneNumber}
        onCancel={() => setShowVerify(false)}
      />
      <FlexboxGrid style={{ height: '100%', margin: 0 }}>
        <FlexboxGrid.Item
          colspan={8}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Perfil</h3>
          <ImageUploader
            action={environment.API_BASE + '/auth/users/uploadProfileImg'}
            img={currentUser.profileImg}
            onSuccessUpload={onSuccessImgUpload}
          ></ImageUploader>
          <h4 style={{ marginTop: 20 }}>
            {currentUser.name} {currentUser.lastname}
          </h4>
          <FlexboxGrid style={{ width: '100%', marginTop: 30 }}>
            <FlexboxGrid.Item
              colspan={11}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h5>{0}</h5>
              posts
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2} style={{ height: '100%' }}>
              <Divider vertical style={{ height: '100%' }} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={11}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h5>{currentUser.rating}</h5>
              puntuacion
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item
          colspan={2}
          style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Divider style={{ height: '100%' }} vertical />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={14}>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h4>Datos personales</h4>
            <div>
              <Button
                color='red'
                disabled={
                  (!isDifferent(basicInfoValue) &&
                    !isDifferent(externalLinksValue)) ||
                  loading
                }
              >
                Cancelar
              </Button>
              <Divider vertical style={{ height: '100%' }} />
              <Button
                color='blue'
                disabled={
                  !isDifferent(basicInfoValue) &&
                  !isDifferent(externalLinksValue)
                }
                loading={loading}
                onClick={onClickSave}
              >
                Guardar
              </Button>
            </div>
          </Container>
          <Divider />
          <BasicInfoForm value={basicInfoValue} setValue={setBasicInfoValue} />
          <h4 style={{ marginTop: 30 }}>Seguridad</h4>
          <Divider />
          <SecurityForm
            value={securityInfoValue}
            setValue={setSecurityInfoValue}
            saveChanges={saveChanges}
          />
          <h4 style={{ marginTop: 30 }}>Links externos</h4>
          <Divider />
          <ExternalLinksForm
            value={externalLinksValue}
            setValue={setExternalLinksValue}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};
