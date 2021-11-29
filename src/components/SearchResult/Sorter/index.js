import React , {useState} from 'react';
import './sorter.scss';
const Sorter = (props) => {
    const [reversed, setReversed] = useState(false);
    let handleClick = () =>{
        if(props.setList){
            var list = sortBy(props.name);
            if(reversed === false){
                setReversed(true);
            } else {
                list.reverse();
                setReversed(false);
            }
            props.setList(list);
        } else {
            return;
        }
    }
    let sortBy = (sortCriteria) =>{
        let list = props.list;
        if(props.valueSort){
            list.sort((a,b) => a[sortCriteria] - b[sortCriteria]);
        } else {
            list.sort((a,b) => {
                var str1 = a[sortCriteria].toUpperCase();
                var str2 = b[sortCriteria].toUpperCase();
                if( str1 > str2) return 1;
                if(str1 < str2) return -1;
                return 0; 
                });
        }
        return list;
        
    }
    return (
        <div  className="sorter" id={props.name}>
            <div className="overlay-click-catcher" onClick={handleClick}>
            </div>
            <div className="sorter-name">{props.name}</div>
            <div className="sorter-order">
                {reversed ? <span class="material-icons">arrow_downward</span> : <span class="material-icons">arrow_upward</span>  }
            </div>
        </div>
    );
}

export default Sorter;

