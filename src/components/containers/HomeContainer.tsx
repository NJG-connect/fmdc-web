import React from 'react';
import { HomeOrganism } from '../organisms';


interface data {
  id: number;
  name: string;
}

export default function HomeContainer() {

  const fakeData: data[] = [
    {id: 2341, name: "Provins"},
    {id: 2951, name: "Rousseaux"},
    {id: 9462, name: "DI Environement"},
    {id: 5820, name: "Cocherot"},
  ]

  return <HomeOrganism data={fakeData} />;
}
