import React from 'react';
import axios  from 'axios'
import { CSSTransition } from "react-transition-group";
import Friends from './friends';

class Contact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            location:"",
            year:"",
            submitStatus:"",
            friends:[]
        }

        this.captureInputName = this.captureInputName.bind(this)
        this.captureInputLocation = this.captureInputLocation.bind(this)
        this.captureInputYear = this.captureInputYear.bind(this)
        this.userSubmitted = this.userSubmitted.bind(this)
    }

    userSubmitted(){
        console.log("Form submitted");
        console.log(this.state)
        axios.post("http://localhost:8888/add", this.state)
                                .then((data)=>{
                                    console.log(data)
                                   this.setState({submitStatus: data.status})    
                                   console.log("Insert Success - calling update") 
                                   this.getData()
                                })
       
        
    }

    captureInputName(e){
        console.log(e.target.value);
        this.setState({name:e.target.value})
    }

    captureInputLocation(e){
        console.log(e.target.value);
        this.setState({location:e.target.value})
    }

    captureInputYear(e){
        console.log(e.target.value);
        this.setState({year:e.target.value})
    }

    componentWillMount(){
       this.getData()
    }
 
    getData(){
       return axios.get('http://localhost:8888/get')
        .then((frn)=>{
            //console.log(frn.data)
            console.log("Getting friends")
            this.setState({friends: frn.data})
            console.log(this.state.friends);
        })
    }


    render() { 

        const displayFriends = this.state.friends.map((f)=>{
            return(
                <Friends
                    key={f._id}
                    name={f.name}
                    year={f.year} 
                    location={f.location}
                ></Friends>
            )
        }) 

        return (  
            <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade"
            enter={false}
        >
      
           
            <div>
                I am at contact. 
                <div>
                    <form onSubmit={this.userSubmitted}>
                        Name: 
                        <input type="text" onChange={this.captureInputName}></input><br></br>
                        Location:
                        <input type="text" onChange={this.captureInputLocation}></input><br></br>
                        Year:
                        <input type="number" onChange={this.captureInputYear}></input><br></br>
                        <br></br>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <br></br>
                {this.state.submitStatus}
                <hr></hr>
                <h3>All Friends</h3>
                <ol>
                    {displayFriends}
                </ol>

            </div>
            </CSSTransition>
            
        );
    }
}
 
export default Contact;