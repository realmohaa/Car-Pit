import User from '../../layouts/User'
import GetStartedCard from '../../components/cards/GetStartedCard'
import ActionCard from '../../components/cards/ActionCard'
import CarImg from '../../assets/car2.png'
import Car from '../../assets/car.png'

const index = () => {
  return (
    <User>
      <div className=' w-screen ml-28'>
        <GetStartedCard/>
        <ActionCard title="Actions" name="Add Vehicle" img={CarImg}/>
        <ActionCard title="Services" name="Vehicle History" img={Car}/>
      </div>
    </User>
  )
}

export default index