'use client'

import Intro from '../components/intro'
import AboutUs from '../components/AboutUs'
import MisionVision from '../components/MisionVision'
import GlaringClean from '../components/GlaringClean'
import OurPeople from '../components/OurPeople'
import WorkerCompensation from '../components/WorkerCompensation'
import ChooseUs from '../components/Choose-Us'
import SecuritySystem from '../components/SecuritySystem'
import ContingencyPlan from '../components/ContingencyPlan'
import QualityAssurance from '../components/QualityAssurance'
import CrossContamination from '../components/CrossContamination'
import TasksOrganization from '../components/TasksOrganization'
import Equipment from '../components/Equipment'

export default function Home() {

    return (
        <div className="w-full">

            {/* <Intro /> 
            
            <AboutUs /> 

            <MisionVision />

            <GlaringClean />

            <OurPeople />

            <WorkerCompensation /> 

            <ChooseUs />

            <SecuritySystem />

            <ContingencyPlan />

            <QualityAssurance />

            <CrossContamination /> */}

            <TasksOrganization />

            <Equipment />

        </div>
    )
}
