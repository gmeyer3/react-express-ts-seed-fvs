import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

interface TableData {
  name: string;
  age: number;
  email: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('Never');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/table1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  const header = (
    <div className="flex align-items-center justify-content-between">
      <h2 className="m-3 p-3">User Data Table</h2>
      <Button 
        label="Refresh" 
        icon="pi pi-refresh" 
        onClick={fetchData} 
        loading={loading}
        className="p-button-outlined m-2"
      />
    </div>
  );

  const footer = (
    <div className="flex flex-column align-items-end">
      <div className="mb-2">Last updated: {lastUpdate}</div>
    </div>
  );

  return (
    <div className="container">
      <div className="grid">
        <div className="col-12 md:col-10 md:col-offset-1 lg:col-8 lg:col-offset-2">
          <Card header={header} footer={footer} className="shadow-4">
            {error ? (
              <Message severity="error" text={error} className="w-full" />
            ) : (
              <DataTable 
                value={data} 
                loading={loading}
                className="p-datatable-sm"
                emptyMessage="No data available"
                showGridlines
                stripedRows
                paginator 
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              >
                <Column 
                  field="name" 
                  header="Name" 
                  style={{ minWidth: '200px' }}
                />
                <Column 
                  field="age" 
                  header="Age" 
                  style={{ minWidth: '100px' }}
                />
                <Column 
                  field="email" 
                  header="Email" 
                  style={{ minWidth: '250px' }}
                />
              </DataTable>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App; 