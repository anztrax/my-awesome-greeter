import React from 'react';
import dateDayJsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  DateTimePicker,
} from '@material-ui/pickers';

interface PropTypes{
  type: 'date' | 'datetime';
  id: string;
  label?: string;
  format: string;
  value?: any;
  minDate?: any;
  maxDate?: any;
  isMinDate?: boolean;
  isMaxDate?: boolean;
  disabled?: boolean;
  handleChange?: (event?: any, newValue?: string) => void | any;
  returnFormat?: string;
}

const InputDatePicker: React.FunctionComponent<PropTypes> = ({
  type = 'datetime',
  id = '',
  label = '',
  format = '',
  value = new Date(),
  minDate = undefined,
  maxDate = undefined,
  disabled = false,
  handleChange = () => {},
  returnFormat = 'YYYY-MM-DD',
}: PropTypes) => {
  // STATE
  // [NOTE] complete documentation: https://material-ui-pickers.dev/api/DatePicker
  // OTHER
  const onChange = (date) => {
    handleChange(date, date.format(returnFormat));
  };
  return (
    <MuiPickersUtilsProvider
      utils={dateDayJsUtils}
    >
      {type === 'datetime' ? (
        <DateTimePicker
          value={value}
          onChange={onChange}
          inputVariant="outlined"
          minDate={minDate}
          maxDate={maxDate}
          format={format}
          disabled={disabled}
          size="small"
          fullWidth
        />
      ) : (
        <DatePicker
          id={id}
          label={label}
          format={format}
          inputVariant="outlined"
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          size="small"
          fullWidth
        />
      )}
    </MuiPickersUtilsProvider>
  );
};

export default InputDatePicker;
