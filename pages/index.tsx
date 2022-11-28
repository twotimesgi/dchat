import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import InputBox from '../components/InputBox'
import MessageBox from '../components/MessageBox'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { address, isConnected } = useAccount()
  const ConnectScreen = dynamic(
    () => import('../components/ConnectScreen'),
    { ssr: false }
  )
  const StatusBar = dynamic(
    () => import('../components/StatusBar'),
    { ssr: false }
  )
  return (
    <div>
      <Head>
        <title>dChat</title>
        <meta name="description" content="Simple decentralized chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="app">
      {!isConnected && <ConnectScreen/>}
      {isConnected && <StatusBar isConnected={isConnected} address={address}/> }
      {isConnected &&<MessageBox address={address}/>}
      {isConnected && <InputBox /> }
      </div>
    </div>
  )
}
