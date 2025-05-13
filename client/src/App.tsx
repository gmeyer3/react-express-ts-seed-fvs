import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('Never');
  const [debugInfo, setDebugInfo] = useState<string>('');

  const fetchMessage = async () => {
    // Add timestamp to URL to prevent caching
    const timestamp = new Date().getTime();
    const url = `/api/hello?t=${timestamp}`;
    console.log('=== Starting API call ===');
    console.log('Fetching from:', url);
    
    try {
      setLoading(true);
      setDebugInfo('');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      console.log('Response received:');
      console.log('- Status:', response.status);
      console.log('- Status Text:', response.statusText);
      console.log('- Headers:', Object.fromEntries(response.headers.entries()));
      
      setDebugInfo(prev => prev + `Status: ${response.status}\n`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('- Raw response:', text);
      setDebugInfo(prev => prev + `Raw response: ${text}\n`);

      try {
        const data = JSON.parse(text);
        console.log('- Parsed data:', data);
        setDebugInfo(prev => prev + `Parsed data: ${JSON.stringify(data)}\n`);
        
        if (data && typeof data === 'object' && 'message' in data) {
          setMessage(data.message);
          setLastUpdate(new Date().toLocaleTimeString());
          setError(null);
        } else {
          throw new Error('Response did not contain expected message property');
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        setDebugInfo(prev => prev + `Parse error: ${parseError}\n`);
        throw new Error('Invalid JSON response from server');
      }
    } catch (err) {
      console.error('=== API Error ===');
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch message');
      setMessage('Error loading message');
    } finally {
      setLoading(false);
      console.log('=== API call complete ===\n');
    }
  };

  // Initial fetch only
  useEffect(() => {
    console.log('Component mounted - Making initial API call');
    fetchMessage();
  }, []);

  const header = (
    <div className="flex align-items-center justify-content-center">
      <h2 className="m-4">React Express TypeScript Demo</h2>
    </div>
  );

  const footer = (
    <div className="flex flex-column align-items-end">
      <div className="mb-2">Last updated: {lastUpdate}</div>
      <Button 
        label="Manual Refresh" 
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
                {/*debugInfo && (
                  <div className="mt-3 p-2 border-1 surface-border border-round overflow-auto" style={{ maxHeight: '200px', fontSize: '0.8rem' }}>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{debugInfo}</pre>
                  </div>
                )*/}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App; 