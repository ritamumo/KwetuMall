
import Alert from 'react-bootstrap/Alert';

const SuccessAlert = ({showAlert, setShowAlert}) => {
  

  if (showAlert) {
    return (
      <Alert variant="Success" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Successfully Checked out</Alert.Heading>
        <p>Pick Items within 7 days of ordering</p>
      </Alert>
    );
  }
  
}

export default SuccessAlert;