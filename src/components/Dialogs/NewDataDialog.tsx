import { Box, Button, Dialog, DialogContent, Slide, SxProps, Typography } from "@mui/material"
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from "react";

type DialogProps = {
    open: boolean,
    onClose: () => void,
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

  const contentStyle: SxProps= {
    display:"flex", 
    flexDirection:"column",
    alignItems:"center",
    gap:2
  }

  const buttonStyle: SxProps= {
    width:"150px",
    height:"40px",
    borderRadius:"10px",
    borderColor:"#D1D1D1"
  }

  const labelStyle: SxProps= {
    color:"#104C82",
    fontWeight:"bold"
  }


//   const sx: SxProps = {
//     "& .MuiDialog-container": {
//       alignItems: "flex-start",
//       justifyContent:"flex-start",
//       mt:"90px",
//       ml:"80px",
//       paddin
//     }
//  };

const NewDataDialog = (props: DialogProps) => {
    const {onClose, open} = props;

    const handleClose = () => {
        onClose();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth={true}
                TransitionComponent={Transition}
                sx={{
                    "& .MuiDialog-container": {
                        alignItems: "flex-start",
                        justifyContent:"flex-start",
                        mt:"90px",
                        ml:"80px",
                      }
                }}
            >
                <DialogContent sx={{
                    padding:"40px",
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <Box sx={contentStyle}>
                        <Typography sx={labelStyle}>Transactions</Typography>
                        <Button 
                            variant="outlined" 
                            sx={buttonStyle}
                        >
                            <Typography variant="caption">Add</Typography>
                        </Button>                    </Box>
                    <Box sx={contentStyle}>
                        <Typography sx={labelStyle}>Reports</Typography>
                        <Button 
                            variant="outlined" 
                            sx={buttonStyle}
                        >
                            <Typography variant="caption">Add</Typography>
                        </Button>
                    </Box>
                    <Box sx={contentStyle}>
                        <Typography sx={labelStyle}>Inventory</Typography>
                        <Button 
                            variant="outlined" 
                            sx={buttonStyle}
                        >
                            <Typography variant="caption">Add</Typography>
                        </Button>                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewDataDialog