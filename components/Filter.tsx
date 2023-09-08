
interface filterProps{
    f: boolean[]
    s: (val:boolean[]) => void
}

const Filter:React.FC<filterProps> = ({f, s}) => {

    function getClass(inp:boolean){
        if (inp){
            return "selected";
        }
        else {
            return "unselected";
        }
    }



    return ( <div className = "filtCont">

        <div className = "font-bold text-center p-[10px]"> Filters </div>
        <div className = "flex justify-center flex-wrap">

        <button className = {"filt " + getClass(f[0])} onClick={() => s([!f[0], f[1], f[2], f[3]])}> 100s </button>
        <button className = {"filt " + getClass(f[1])} onClick={() => s([f[0], !f[1], f[2], f[3]])}> 200s </button>
        <button className = {"filt " + getClass(f[2])} onClick={() => s([f[0], f[1], !f[2], f[3]])}> 300s </button>
        <button className = {"filt " + getClass(f[3])} onClick={() => s([f[0], f[1], f[2], !f[3]])}> 400s </button>
        
        </div>
        </div>

    );

}
export default Filter;