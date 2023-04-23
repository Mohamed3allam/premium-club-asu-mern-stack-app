import styled from "styled-components"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { userData } from "../../dummyData";


const Container = styled.div`
  margin: 20px;
  padding: 20px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const ChartTitle = styled.h3`
  margin-bottom: 20px;
`


const Chart = ({title, data, dataKey, grid }) => {
  return (
    <Container>
        <ChartTitle>{title}</ChartTitle>
        <ResponsiveContainer width='100%' aspect={4/1}>
          <LineChart data={data}>
            {grid && <CartesianGrid strokeDasharray="5 5" />}
            <XAxis dataKey='name'></XAxis>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
    </Container>
  )
}

export default Chart
