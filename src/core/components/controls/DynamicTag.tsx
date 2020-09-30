import React from 'react';
import { Icon, IconButton, Input, Tag, TagGroup } from 'rsuite';

interface DynamicTagProps {
    onChangeTags: (tags: string[]) => void;
}

export default class extends React.Component<DynamicTagProps> {
  state = {
    typing: false,
    inputValue: '',
    tags: [],
  };
  input: any = null;
  constructor(props: DynamicTagProps) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
  }
  handleButtonClick() {
    this.setState(
      {
        typing: true,
      },
      () => {
        this.input.focus();
      }
    );
  }
  handleInputChange(inputValue: string) {
    this.setState({ inputValue });
  }
  handleInputConfirm() {
    const { inputValue, tags } = this.state;
    const nextTags = inputValue ? [...tags, inputValue] : tags;
    this.setState({
      tags: nextTags,
      typing: false,
      inputValue: '',
    });
    this.props.onChangeTags(nextTags);
  }
  handleTagRemove(tag: string) {
    const { tags } = this.state;
    const nextTags = tags.filter((item) => item !== tag);
    this.setState({
      tags: nextTags,
    });
    this.props.onChangeTags(nextTags);
  }
  renderInput() {
    const { typing, inputValue } = this.state;

    if (typing) {
      return (
        <Input
          className='tag-input'
          inputRef={(ref) => {
            this.input = ref;
          }}
          size='xs'
          style={{ width: 70 }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    }

    return (
      <IconButton
        className='tag-add-btn'
        onClick={this.handleButtonClick}
        icon={<Icon icon='plus' />}
        appearance='ghost'
        size='xs'
      />
    );
  }
  render() {
    const { tags } = this.state;
    return (
      <TagGroup style={{ margin: '0 0' }}>
        {tags.map((item, index) => (
          <Tag
            key={index}
            closable
            onClose={() => {
              this.handleTagRemove(item);
            }}
          >
            {item}
          </Tag>
        ))}
        {this.renderInput()}
      </TagGroup>
    );
  }
}
