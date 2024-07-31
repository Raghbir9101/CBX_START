import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Autocomplete, TextField } from '@mui/material';
import { ElementWrapper } from '../Page/Page';

const WorldClock = ({
    data,
    onChange,
    provided,
    item,
    handleDelete,
    pageMetaData,
}) => {
    const [selectedTimezone, setSelectedTimezone] = useState(data.timeZone || 'Asia/Kolkata'); // State to hold selected timezone
    const [currentTime, setCurrentTime] = useState(''); // State to hold current time
    const [collapsed, setCollapsed] = useState(data?.collapsed);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.data.name || "");

    // List of all timezones
    const timezones = moment.tz.names();

    useEffect(() => {
        if (!selectedTimezone) return;
        let intervalID = setInterval(() => {
            const time = moment().tz(selectedTimezone).format('YYYY-MM-DD HH:mm:ss');
            setCurrentTime(new Date(time));
        }, 500);

        return () => {
            clearInterval(intervalID);
        };
    }, [selectedTimezone]);

    const handleTimezoneChange = (event, value) => {
        if (value) {
            onChange({
                timeZone: value, collapsed, title
            })
            setSelectedTimezone(value);
            const time = moment().tz(value).format('YYYY-MM-DD HH:mm:ss');
            setCurrentTime(new Date(time));
        }
    };


    
  useEffect(() => {
    onChange({ collapsed });
  }, [collapsed]);

  
    return (
        <ElementWrapper
            editable={pageMetaData.role === 'OWNER' || pageMetaData.role === 'EDITOR'}
            collapsed={data?.collapsed}
            setCollapsed={setCollapsed}
            handleTitleChange={(val) => setTitle(val)}
            editing={editing}
            handleDelete={handleDelete}
            provided={provided}
            item={item}
        >
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4>Select Timezone</h4>
                <Autocomplete
                
                    value={selectedTimezone}
                    onChange={handleTimezoneChange}
                    options={timezones}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // label="Select a timezone..."
                            variant="outlined"
                            size="small"
                        />
                    )}
                />
                <div>
                    {currentTime && (
                        <h1 >
                            {currentTime.toLocaleTimeString()}
                        </h1>
                    )}
                </div>
            </div>
        </ElementWrapper>
    );
};

export default WorldClock;
