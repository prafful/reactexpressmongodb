import React from 'react';

class Friends extends React.Component {
    state = {  }
    render() { 
        return ( 
         
                <li>{this.props.name}  from  {this.props.location}</li>
         
         
         );
    }
}
 
export default Friends;