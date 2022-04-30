import FeatureCard from './FeatureCard';

const CarHistory = ({issueCount, issue, junkAndSalvage, vinChanged}) => {

    return (
        <div className='flex flex-col'>
        <p className="text-gray-600 font-bold">{vinChanged ? 'Vin Was Changed' : null}</p>
        <div className='flex flex-wrap'>
            {
                issueCount === 0 && junkAndSalvage.length === 0 && (
                    <FeatureCard title="No History Found"/>
                )
            }
            {
                issueCount != 0
                ?
                (<FeatureCard title={issue?.name} desc={issue?.description.replaceAll('"', '')} />)
                :
                null
            }
            {
                junkAndSalvage?.map(junkInfo => {
                    return (<FeatureCard icon="junk" title={junkInfo?.ReportingEntityAbstract.ReportingEntityCategoryText} date={junkInfo.VehicleObtainedDate} desc={junkInfo.VehicleDispositionText} />)
                })
            }
        </div>
        </div>
    )
}

export default CarHistory