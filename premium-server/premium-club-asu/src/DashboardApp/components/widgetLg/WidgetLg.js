import styled from "styled-components"
import './widgetLg.css'

const Container = styled.div`
  flex: 2;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
  padding: 20px;
`
const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`
const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`
const WidgetLgTr = styled.tr``
const WidgetLgTh = styled.th`
  text-align: left;
`
const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`
const WidgetLgImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`
const WidgetLgName = styled.span``
const WidgetLgDate = styled.td`
  font-weight: 300;
`
const WidgetLgAmount = styled.td`
  font-weight: 300;
`
const WidgetLgStatus = styled.td``

const WidgetLg = () => {

  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type} style={{padding:"5px 7px", border:'none', borderRadius:'10px'}}>{type}</button>;
  }
  return (
    <Container>
        <WidgetLgTitle>Latest transactions</WidgetLgTitle>
        <WidgetLgTable>
          <WidgetLgTr>
            <WidgetLgTh>Customer</WidgetLgTh>
            <WidgetLgTh>Date</WidgetLgTh>
            <WidgetLgTh>Amount</WidgetLgTh>
            <WidgetLgTh>Status</WidgetLgTh>
          </WidgetLgTr>
          <WidgetLgTr>
            <WidgetLgUser>
              <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
              <WidgetLgName>Susan Carol</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>23 Dec 2022</WidgetLgDate>
            <WidgetLgAmount>$229.05</WidgetLgAmount>
            <WidgetLgStatus>
              <Button type="Approved"/>
            </WidgetLgStatus>
          </WidgetLgTr>
          <WidgetLgTr>
            <WidgetLgUser>
              <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
              <WidgetLgName>Susan Carol</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>23 Dec 2022</WidgetLgDate>
            <WidgetLgAmount>$229.05</WidgetLgAmount>
            <WidgetLgStatus>
              <Button type="Declined"/>
            </WidgetLgStatus>
          </WidgetLgTr>
          <WidgetLgTr>
            <WidgetLgUser>
              <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
              <WidgetLgName>Susan Carol</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>23 Dec 2022</WidgetLgDate>
            <WidgetLgAmount>$229.05</WidgetLgAmount>
            <WidgetLgStatus>
              <Button type="Pending"/>
            </WidgetLgStatus>
          </WidgetLgTr>
          <WidgetLgTr>
            <WidgetLgUser>
              <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
              <WidgetLgName>Susan Carol</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>23 Dec 2022</WidgetLgDate>
            <WidgetLgAmount>$229.05</WidgetLgAmount>
            <WidgetLgStatus>
              <Button type="Approved"/>
            </WidgetLgStatus>
          </WidgetLgTr>
        </WidgetLgTable>
    </Container>
  )
}

export default WidgetLg
