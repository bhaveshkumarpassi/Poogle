import React, {Component} from 'react';
import './SingleBlog.css';

class Blog extends Component {

    constructor(props){
        super(props);
        this.state = {
            content:""
        }
    }

    render(){
        return(
            <div className='container'>
                <div className="editor__content" dangerouslySetInnerHTML={{ __html: this.state.content }} />
            </div>
        );
    }
}

export default Blog;