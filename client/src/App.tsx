import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import axios from 'axios';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/hello');
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError('Failed to fetch message from server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <div className="flex align-items-center justify-content-center">
      <h2 className="m-0">Hello World App</h2>
    </div>
  );

  const footer = (
    <div className="flex justify-content-end">
      <Button 
        label="Refresh" 
        icon="pi pi-refresh" 
        onClick={fetchMessage} 
        loading={loading}
      />
    </div>
  );

  return (
    <div className="container">
      <div className="grid">
        <div className="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
          <Card header={header} footer={footer} className="shadow-4">
            {error ? (
              <Message severity="error" text={error} className="w-full" />
            ) : loading ? (
              <div className="flex justify-content-center">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
              </div>
            ) : (
              <div className="text-center p-4">
                <h3>{message}</h3>
                <p>Welcome to your TypeScript React + Express application with PrimeReact UI!</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App; 