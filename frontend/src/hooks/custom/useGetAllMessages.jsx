import { setMessages } from "@/redux/Chatslice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

 const useGetAllMessages = () =>{
    const {messages} = useSelector(state=>state.chat)
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.auth);

useEffect(() => {
  if (!selectedUser?._id) return;
  const fetchMessages = async () => {
    const res = await axios.get(`https://instavivid.onrender.com/api/v1/message/all/${selectedUser._id}`, {
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res.data.messages);
      
      dispatch(setMessages(res.data.messages));
    }
  };

  fetchMessages();
}, [selectedUser?._id]); // track ID changes

}

export default useGetAllMessages