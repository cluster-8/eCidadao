import React from 'react'
import { Container, CardTitle, CardBody, CardData, CardIcon } from './styles'
import { RFHeight } from '../../utils/getResponsiveSizes'

interface DashboardCardProps {
  title?: string
  data?: any
  icon?: any
  type?: any
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  data,
  icon,
  type,
}) => {
  return (
    <Container>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <CardData>{data}</CardData>
        <CardIcon name={icon} size={RFHeight(30)} type={type} />
      </CardBody>
    </Container>
  );
}
