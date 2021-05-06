import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  useTheme,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Skeleton from '@material-ui/lab/Skeleton';
import Checkbox from '@material-ui/core/Checkbox';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import { INode } from '../../../types/common';

export interface IColumnPropTypes {
  id: string | number;
  name?: string;
  selector?: string;
  render?: (data?: any, key?: number) => INode;
  width?: string | number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

interface PropTypes {
  // TABLE PROPS
  columns: IColumnPropTypes[];
  data: any[];
  loading?: boolean;
  loadingRows?: number;
  limits?: number[];
  totalRows?: number;
  limit?: number;
  page?: number;
  onChangePage?: (event?: any, newValue?: number) => void | any;
  onChangeLimit?: (event?: any) => void | any;
  hasPagination?: boolean;
  hasHeader?: boolean;
  keySelector?: string;
  // SELECTED ROWS TABLE PROPS
  canSelectRows?: boolean;
  selectRowsKeySelector?: string | number;
  selectRowsValue?: any[];
  onChangeSelectRows?: (values?: any[]) => void | any;
}

const StyledCellHead = withStyles((theme: Theme) => createStyles(
  {
    head: {
      backgroundColor: '#93D6CE',
      color: theme.palette.common.white,
      fontWeight: 'bolder',
    },
  },
))(TableCell);

const StyledRow = withStyles(() => createStyles(
  {
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f7f7f7',
      },
    },
  },
))(TableRow);

const useDivStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const divStyles = useDivStyles();
  const theme = useTheme();
  const {
    count,
    page,
    rowsPerPage,
    onChangePage,
  } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={divStyles.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const HeadTableCheckbox = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.customPrimary.darkest,
    '&$checked': {
      color: theme.palette.customPrimary.darkest,
    },
  },
  checked: {},
}))(Checkbox);

const TableCheckbox = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.customPrimary.main,
    '&$checked': {
      color: theme.palette.customPrimary.main,
    },
  },
  checked: {},
}))(Checkbox);

const TableComponent: React.FunctionComponent<PropTypes> = ({
  data = [],
  columns = [],
  limits = [5, 10, 25, 50],
  totalRows = 0,
  limit = 5,
  page = 0,
  onChangePage = () => {},
  onChangeLimit = () => {},
  hasPagination = false,
  hasHeader = true,
  loading = false,
  loadingRows = 3,
  keySelector = 'id',
  canSelectRows = false,
  selectRowsKeySelector = 'id',
  selectRowsValue = [],
  onChangeSelectRows = () => {},
}: PropTypes) => {
  const arrayLoading = [];
  for (let index = 0; index < loadingRows; index += 1) {
    arrayLoading.push(index);
  }

  const onBeforeSelectRowsChange = React.useCallback((val) => {
    const copyValue = [...selectRowsValue];
    const index = selectRowsValue.findIndex(
      (row) => row[selectRowsKeySelector] === val[selectRowsKeySelector],
    );
    if (index === -1) {
      copyValue.push(val);
    } else {
      copyValue.splice(index, 1);
    }
    onChangeSelectRows(copyValue);
  }, [selectRowsValue]);

  const isRowChecked = React.useCallback((val) => {
    const index = selectRowsValue.findIndex(
      (row) => row[selectRowsKeySelector] === val[selectRowsKeySelector],
    );
    if (index !== -1) {
      return true;
    }
    return false;
  }, [selectRowsValue]);

  const onBeforeSelectAllRowsChange = React.useCallback(() => {
    if (
      (selectRowsValue.length > 0 && selectRowsValue.length < data.length)
      || selectRowsValue.length === 0
    ) {
      onChangeSelectRows(data);
    } else if (selectRowsValue.length === data.length) {
      onChangeSelectRows([]);
    }
  }, [selectRowsValue, data]);

  React.useEffect(() => {
    onChangeSelectRows([]);
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          {
            hasHeader && (
              <TableHead>
                <TableRow>
                  {
                    (canSelectRows && !loading && data.length !== 0) && (
                      <StyledCellHead
                        align="center"
                      >
                        <HeadTableCheckbox
                          indeterminate={selectRowsValue.length > 0
                          && selectRowsValue.length < data.length}
                          checked={selectRowsValue.length === data.length}
                          onChange={onBeforeSelectAllRowsChange}
                          // inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                      </StyledCellHead>
                    )
                  }
                  {
                    columns.map((header: IColumnPropTypes) => (
                      <StyledCellHead
                        key={`${header.name}`}
                        style={{
                          minWidth: header.width ? header.width : 'auto',
                          maxWidth: header.width ? header.width : 'auto',
                        }}
                        align={header.align || 'left'}
                      >
                        {header.name}
                      </StyledCellHead>
                    ))
                  }
                </TableRow>
              </TableHead>
            )
          }
          {
            loading && (
              <TableBody>
                {
                  arrayLoading.map((val) => (
                    <StyledRow key={`loading_row_${val}`}>
                      {
                        columns.map((header: IColumnPropTypes) => (
                          <TableCell
                            key={`loading_cell_${header.id}`}
                            style={{ width: header.width ? header.width : 'auto' }}
                          >
                            <Skeleton
                              variant="text"
                              height={15}
                              width="100%"
                            />
                            <Skeleton
                              variant="text"
                              height={15}
                              width="70%"
                            />
                          </TableCell>
                        ))
                      }
                    </StyledRow>
                  ))
                }
              </TableBody>
            )
          }
          {
            (!loading && data.length === 0) && (
              <TableBody>
                <TableRow>
                  <TableCell>No Data</TableCell>
                </TableRow>
              </TableBody>
            )
          }
          {
            (!loading && data.length > 0) && (
              <>
                <TableBody>
                  {
                    data.map((body, key) => (
                      <StyledRow key={`row_${body[keySelector]}`}>
                        {
                          canSelectRows && (
                            <TableCell
                              key={`checkbox_cell_${body[keySelector]}$`}
                              align="center"
                            >
                              <TableCheckbox
                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={isRowChecked(body)}
                                onChange={() => onBeforeSelectRowsChange(body)}
                                // inputProps={{ 'aria-label': 'select all desserts' }}
                              />
                            </TableCell>
                          )
                        }
                        {
                          columns.map((header: IColumnPropTypes) => (
                            <TableCell
                              key={`row_cell_${header.id}$`}
                              style={{
                                minWidth: header.width ? header.width : 'auto',
                                maxWidth: header.width ? header.width : 'auto',
                                whiteSpace: header.width ? 'nowrap' : 'normal',
                                overflow: header.width ? 'hidden' : 'auto',
                                textOverflow: header.width ? 'ellipsis' : 'auto',
                              }}
                              align={header.align || 'left'}
                            >
                              {
                                header.render ? header.render(body, key) : body[header.selector]
                              }
                            </TableCell>
                          ))
                        }
                      </StyledRow>
                    ))
                  }
                </TableBody>
              </>
            )
          }
        </Table>
      </TableContainer>
      {
        hasPagination && (
          <div>
            <TablePagination
              rowsPerPageOptions={limits}
              count={totalRows}
              rowsPerPage={limit}
              page={page - 1}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeLimit}
              ActionsComponent={TablePaginationActions}
              component="div"
            />
          </div>
        )
      }
    </>
  );
};

export default React.memo(TableComponent);
