import React, {useEffect} from 'react';
import TableTitle from './TableTitle';
import TableRow from './TableRow';
import './cool-table.scss';
const CoolTable = (props) => {
    useEffect(()=>{
    
    },[])
    return (
        <div className="cool-table">
            {props.children}
            {props.titleList &&  <TableTitle titleList={props.titleList}></TableTitle>}
            {props.list ? <div className="row-container">
                {
                    props.list.map((item) => {
                        let componentTotal = [];
     
                        for(var i = 0; i <props.titleList.length; i+=1){
                            var component;
                            if(props.titleList[i] === "preview"){
                                component = <div className={"table-data"+" col-"+(i+1)}>
                                <img alt={item.name} src={require('./../../../images/' + item.id + "-" + item.type+ ".jpg")}></img>
                            </div>;
                            } else {
                                component = <div className={"table-data"+" col-"+(i+1)}>{item[props.titleList[i]]}</div> 
                            }
                            componentTotal.push(component)
                        }
                        return <TableRow key={item.name + item.type}>{componentTotal}</TableRow>;
                    })
                }
            </div>:<div>No item yet</div>}         
        </div>
    );
}

export default CoolTable;
