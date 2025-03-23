import { View, Text, ScrollView } from 'react-native';
import AddMedicationHeader from '../../components/AddMedicationHeader';
import AddMedicationForm from '../../components/AddMedicationForm';
 
import React from 'react';

export default function AddNewMedications() {
    return (
        <ScrollView>
            <AddMedicationHeader />
            <AddMedicationForm />
           
       </ScrollView>
  

    )
}