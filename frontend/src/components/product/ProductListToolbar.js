import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const ProductListToolbar = props => (
  <Box {...props}>
    <Box
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button>Import</Button>
      <Button style={{ marginLeft: '1rem' }}>Export</Button>
      <Button color="primary" variant="contained">
        Add product
      </Button>
    </Box>
    <Box style={{ marginTop: '3rem' }}>
      <Card>
        <CardContent>
          <Box style={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ProductListToolbar;
