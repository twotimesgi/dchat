import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import styles from "./InputBox.module.css"
import ContractABI from "../abis/chat.json"
export default function InputBox() {

  const [message, setMessage] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0x9eAaC71039FFC383E55Bc82DE30b6cCFE69c1A49",
    abi: ContractABI,
    functionName: 'sendMessage',
    args: [message],
  })

  const { data, isLoading, write } = useContractWrite(config)

  const { isSuccess, isLoading: isLoadingTx } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleSubmit =  async (event: any) => {
    if(event.key != "Enter") return;
    setMessage("");
    write?.()
  }
  
  return <div className={styles.inputBox}>
    <input className={styles.msgInput} onKeyDown={handleSubmit}  placeholder="Write a message..." value={message} type="text" disabled={isLoading || isLoadingTx} onChange={(e) => setMessage(e.target.value)}/>
  </div>

}
