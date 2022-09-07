
import {FaEye, FaPenSquare, FaUserFriends} from "react-icons/fa"

const UserCommunityDetails = () =>{
    return (<>
    <div className="bg-gray-900 p-2 rounded mt-2">
        Community Stats
        <div className="mt-2">
            <div className="font-semibold flex gap-1 text-blue-400 "><FaEye className="mt-1 " /> Views : 0 </div>
            <div className="font-semibold flex gap-1 text-yellow-500 "><FaPenSquare className="mt-1 " /> Solutions : 0 </div>
            <div className="font-semibold flex gap-1 text-green-500 "><FaUserFriends className="mt-1 " /> Reputation : 0 </div>

        </div>
    </div>
    </>);
}


export default UserCommunityDetails;