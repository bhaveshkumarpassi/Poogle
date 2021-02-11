import React, {Component} from 'react';
import { Card, Button, Form, FormGroup, Label, Input,
    CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle, CardImg} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import {Link} from 'react-router-dom';
import ReactImageAppear from 'react-image-appear';
import Loading from '../loading';
import { baseUrl } from '../../shared/baseUrl'
import './Spaces.css'


    function RenderMenuItem ({space, onClick, auth}) {

        return ( 
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card className='space'>
            <CardBody>
                <CardTitle tag="h6">{space.name}</CardTitle>
            </CardBody>
                <CardImg className='space-img' src={'http://localhost:3001/spaces/'+space._id+'/image'}/>
            <CardBody>
                <CardSubtitle tag="h6" className="mb-4 text-muted"><span className='fa fa-question-circle fa-lg question-icon'/>    {space.questions.length} Questions<Link className='ml-3' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}/questions`}>view</Link></CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted"><span className='fa fa-users fa-lg follower-icon'/>    {space.followers.length} followers</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted"><span className='fa fa-star mt-3 fa-lg question-icon'/>    {space.followers.length} Blogs<Link className='ml-3' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}/blogs`}>view</Link></CardSubtitle>
                <div className='row mt-4'>
                    {/* <Link className='col-12' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}`}>view Ques</Link>
                    <Link className='col-12' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}`}>view Blogs</Link> */}
                    <Button className='col-12 mt-3' color='danger'><span className='fa fa-lg fa-bookmark mr-2 ml-2' />Unfollow</Button>
                </div>
            </CardBody>
          </Card>
        </FadeTransform>
        );
    }

    class Spaces extends Component {

        constructor(props) {

            super(props);

            this.handleSearch = this.handleSearch.bind(this);
            this.state = {
                data: [],
            }

            this.arrayHolder = [];
        }

        handleSearch(event) {

            this.searchFilterFunction(this.searchSpace.value)
            event.preventDefault();
        }

        componentDidMount() {

            this.setState({
                data: this.props.spaces.spaces
            });

            this.arrayHolder = this.props.spaces.spaces
        }


        searchFilterFunction = text => {
        
            const newData = this.arrayHolder.filter(item => {
              const itemData = `${item.name.toUpperCase()}`;
              const textData = text.toUpperCase();
        
              return itemData.indexOf(textData) > -1;
            });
    
            this.setState({
              data: newData,
            });
        };

        render() {
            const menu = this.state.data.map((space) => {  
                return (
                    <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-1 mb-4"  key={space._id}>
                        <RenderMenuItem space={space} onClick={this.props.onClick} auth={this.props.auth} />
                    </div>
                );
            });

            if (this.props.spaces.isLoading) {
                return(
                    <Loading type='spokes' color='grey' />
                );
            }
            else if (this.props.spaces.errMess) {
                return(
                    <div className="container spaces">
                        <div className="row"> 
                            <div className="col-12">
                                <h4>{this.props.spaces.errMess}</h4>
                            </div>
                        </div>
                    </div>
                );
            }
            else 
            {return (
                <div className="container spaces">
                    <div className="row">
                        <Breadcrumb className='mt-3 ml-3'>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Spaces</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <div className='row'>
                                <h3 className='col-12 col-md-4 mb-2 mt-2 space-heading'>Spaces</h3>
                                <Form className='col-12 col-md-8' inline onSubmit={this.handleSearch}>
                                <FormGroup className='row m-1'>
                                    <Label htmlFor="searchSpace" hidden>Search</Label>
                                    <Button className='col-2 searchbtn' type="submit" value="submit"><span className='fa fa-search'></span></Button>
                                    <Input className='col-8' type="text" name="searchSpace" id="searchSpace"  placeholder="Search Spaces ... " 
                                        innerRef={(input) => this.searchSpace = input}
                                    />
                                    <Button className='col-2 cancelbtn' type='reset' value='reset' color='danger' onClick={() => this.setState({ data : this.props.spaces.spaces })}><span className='fa fa-times'></span></Button>
                                </FormGroup>
                                </Form>
                                {/* <Button onClick={() => this.handleScroll()} >Load more</Button> */}
                            </div>
                            <hr style={{marginBottom: 25, marginTop: 25}} />
                        </div>  
                                      
                    </div>
                    <div className="row justify-content-center" >
                        {menu}
                    </div>
                    {/* <div onClick={this.nextPage}> Previous Page </div>
                    <div onClick={this.previousPage}> Next Page </div>  */}
                </div>
            );}            
        }
    }


export default Spaces;