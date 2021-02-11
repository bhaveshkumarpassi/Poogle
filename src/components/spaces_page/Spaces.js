import React, {Component} from 'react';
import { Card, Button, Form, FormGroup, Label, Input,
    CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle, CardImg} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import {Link} from 'react-router-dom';
import ReactImageAppear from 'react-image-appear';
import Loading from '../loading';
import { baseUrl } from '../../shared/baseUrl'
import './Spaces.css'
import { fetchSpaces } from '../../redux/ActionCreators';
import { connect } from "react-redux";
import { fetchUser } from "../../redux/ActionCreators";
import { BsArrowBarRight } from 'react-icons/bs';

    class Spaces extends Component {

        constructor(props) {

            super(props);

            this.handleSearch = this.handleSearch.bind(this);
            this.state = {
                data: [],
                limit: 4,  
                skip: 0,
            }

            this.arrayHolder = [];
        }

        componentDidMount() {
            const authId= this.props.auth.userId
            const user= this.props.user.user;
            let userId;
            if(user){
                userId = user.userId;
            }
            if(authId){
                if(!user||userId!=authId){
                    this.props.fetchUser(authId);
                }
            }
            console.log("Authentication", this.props.auth);
            console.log("Fetched User ",this.props.user);
            // if(this.props.auth && this.props.auth.userId){
            //     const {userId} = this.props.auth
            //     const user = this.props.user;
            //     if(!(user.user && user.user==userId)){
            //         this.props.fetchUser(userId);//backend Call
            //     } 
            // }

            this.setState({
                data: this.props.spaces.spaces
            });

            this.arrayHolder = this.props.spaces.spaces
            
        }

        handleSearch(event) {

            this.searchFilterFunction(this.searchSpace.value)
            event.preventDefault();
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

        UnfollowSpace = (e)=>{
            e.preventDefault();
            let type = "unfollow";
            let spaceId = e.target.value;
            const data = {type, spaceId};
            console.log(data);
            //call to backend
        }
        
        FollowSpace = (e)=>{
            e.preventDefault();
            let type = "follow";
            let spaceId = e.target.value;
            const data = {type, spaceId};
            console.log(data);
            //call to backend
        }
        
        renderButton = (stringId, user)=>{
            console.log(stringId);
            if(!user){
                return(
                    <>
                        <Button className='col-12 mt-3' color='danger' value={stringId} onClick={this.FollowSpace}>
                            <span className='fa fa-lg fa-bookmark mr-2 ml-2' />Follow
                        </Button>
                    </>
                )
            }
            const userInterests= user.interests;           
            if(userInterests){
                let isPresent =false; 
                userInterests.map(({interest})=>{
                    if(interest===stringId){
                        isPresent = true;
                    }
                })
                if(isPresent){
                    return(
                        <>
                            <Button className='col-12 mt-3' color='danger' value={stringId} onClick={this.UnfollowSpace}>
                                <span className='fa fa-lg fa-bookmark mr-2 ml-2' />Unfollow
                            </Button>
                        </>
                    )
                }
                return(
                    <>
                        <Button className='col-12 mt-3' color='danger' value={stringId} onClick={this.FollowSpace}>
                            <span className='fa fa-lg fa-bookmark mr-2 ml-2' />Follow
                        </Button>
                    </>
                )
            }
        
        }

        
        RenderMenuItem  = (space, user)=>{

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
                    <CardSubtitle tag="h6" className="mb-4 text-muted"><span className='fa fa-question-circle fa-lg question-icon'/>    {space.questions.length} Questions</CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"><span className='fa fa-users fa-lg follower-icon'/>    {space.followers.length} followers</CardSubtitle>
                    <div className='row mt-4'>
                        <Link className='col-12' style={{textAlign: 'center'}} to={`/spaces/${space._id}/${space.stringId}`}>view</Link>
                        {this.renderButton(space.stringId, user)}
                        {/* <Button className='col-12 mt-3' color='danger'><span className='fa fa-lg fa-bookmark mr-2 ml-2' />Follow</Button> */}
                    </div>
                </CardBody>
            </Card>
            </FadeTransform>
            );
        }
        /*nextPage() {
            this.setState({
                skip: this.state.skip + this.state.limit,
            })
        }
        previousPage() {
            if(this.state.skip > 0) {
                this.setState({
                    skip: this.state.skip - this.state.limit,
                })
            }
        }*/

        /*componentDidUpdate = async (prevProps, prevState) => {

            if(this.state.skip !== prevState.skip){
                await this.props.fetchSpaces(this.state.limit, this.state.skip);

                this.setState({
                    data: this.props.spaces.spaces
                });
    
                this.arrayHolder = this.props.spaces.spaces
            }

            
        }*/

        render() {
            const menu = this.state.data.map((space) => {  
                return (
                    <div className="col-12 col-lg-3 col-md-6 col-sm-6 mt-1 mb-4"  key={space.id}>
                        {this.RenderMenuItem(space, this.props.user.user)}
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


/*const mapStateToProps = (state, ownProps) => {
    return {
        spaces: state.spaces
    };
};

const mapDispatchToProps = (dispatch) => ({
	fetchSpaces: () => {
		dispatch(fetchSpaces());
	}
});*/
const mapStateToProps = (state, ownProps) => {
	return {
		user:state.user,
		auth:state.auth
	};
};
export default connect(mapStateToProps, {fetchUser})(Spaces)
//export default connect(mapStateToProps, mapDispatchToProps)(Spaces);
// const mapStateToProps
// export default Spaces;