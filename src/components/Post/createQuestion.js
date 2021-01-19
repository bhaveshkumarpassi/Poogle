import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import './post.css';
import {createQuestion} from '../../redux/ActionCreators';
import { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';


class PostQuestion extends Component {

  constructor(props){
    super(props);
    this.state={
      question:'',
     description:''
    };
  }
  
  handleQuestionChange=(e)=>{
        this.setState({
          question:e.target.value
        })
  }

  handleDescriptionChange=(e)=>{
    this.setState(
      {description:e}
    )
}
onEditorStateChange = (editorState) => {
       this.setState({
         editorState,
       });
    };

  handleFormSubmit=(e)=>{
    const {title,description}=this.state;
    if(title && description){
          this.props.dispatch(createQuestion(title,description));
    }
   }
  render(){
    return(
      <div className="container addquestions">
    <div className="row">
        <Breadcrumb className='mt-3 ml-3'>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>ADD QUESTION</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <div className='row'>
                <h3 className='col-12 col-md-4 mb-2 mt-2 question-heading '>Ask a question</h3>
       </div>
       </div>
       </div>
       <Form className='col-12 col-md-8'>
       <FormGroup className="Question">
       <Label for="Question">Question</Label>
       <Input typ
       type="text"
       id="text"
       name="text"
       placeholder="Start your question with What,How,Why,etc...." 
       required
       onChange={this.handleQuestionChange} 
       value={this.state.question} 
       />  
     </FormGroup>
     
      <FormGroup className="Description">
      <Label for="Text">Description</Label>
      <ReactQuill typ
        modules={createQuestion.modules}
        formats={createQuestion.formats}
        required
        placeholder="Describe the details of question" 
        onChange={this.handleDescriptionChange}
        value={this.state.description}
        />
      </FormGroup>
      <Button 
      color="primary"
      className="Submit primary" 
      id="add-question-btn" 
      onClick={this.handleFormSubmit}>Submit</Button>
    </Form>
    </div>
    )
  }

}

createQuestion.modules={
  toolbar:[
    [{header:'1'},{header:'2'},{header:'3'},{font:[] }],
    [{size:[]}],
    ['bold','italic','underline','strike','blockquote'],
    [{list:'ordered'},{list:'bullet'}],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
};

createQuestion.formats=[
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
]



export default connect()(PostQuestion);
  


