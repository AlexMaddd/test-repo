import { Box, Button, Dialog, DialogContent, InputAdornment, Select, Slide, TextField, Typography } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TransitionProps } from "@mui/material/transitions";
import { Formik } from "formik";
import { forwardRef } from "react";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";

type CRUDDialog = {
    open: boolean,
    onClose: () => void,
    action:string
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


const CRUDDialog = (props: CRUDDialog) => {
    const {open, onClose, action} = props

    const handleClose = () => {
        onClose();
    }

    const save = (values: {}) => {
        console.log(values);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth="sm"
                // sx={{
                //     '& .MuiTypography-root':{
                //         width:"600px"
                //     }
                // }}
            >
                <DialogContent sx={{
                    display:"flex", 
                    flexDirection:"column",
                    gap:1
                }}>
                    {/* <Box sx={{
                        display:'flex', 
                        flexDirection:'column', 
                        alignItems:"center", 
                        alignSelf:"center", 
                        gap:2
                    }}>
                        <Typography variant="h5">{action} Reports</Typography>
                        <Typography>{format(new Date(), "MM-d-yyyy")} @ {format(new Date(), "H:mm:s")}</Typography>
                    </Box>
                    <Divider variant="middle"/> */}
                    <CRUDDialogHeader handleClose={handleClose} action={action} module="Report"/>
                    <Formik
                        initialValues={{
                            name:'',
                            category:'',
                            quantity:'',
                            price:0,
                            purchaseDate:'',
                            description:'',
                        }}
                        onSubmit={(values) => {
                            save(values)
                        }}
                    >
                        {({values, handleChange, handleSubmit}) => (
                            <Box component="form" onSubmit={handleSubmit} sx={{
                                    display:"flex", 
                                    flexDirection:"column",
                                    gap:2,
                                    padding:2
                                }}
                            >
                                    <Box>
                                        <Typography fontWeight={'bold'}>Name:</Typography>
                                        <TextField 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth={true} 
                                            value={values.name}
                                            onChange={handleChange}
                                            sx={{
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                }
                                            }
                                        }/>
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'}>Category:</Typography>
                                        <Select 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth={true} 
                                            value={values.category}
                                            onChange={handleChange}
                                            sx={{
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                }
                                            }
                                        }/>
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'}>Quantity:</Typography>
                                        <TextField 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth={true} 
                                            value={values.quantity}
                                            onChange={handleChange}
                                            sx={{
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'}>Price:</Typography>
                                        <TextField 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth={true} 
                                            value={values.price}
                                            onChange={handleChange}
                                            type="number"
                                            sx={{
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Php</InputAdornment>,
                                              }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'}>Purchase Date:</Typography>
                                        <DatePicker 
                                            value={values.purchaseDate}
                                            onChange={handleChange}
                                            sx={{
                                                width:"100%", 
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                    }
                                            }}
                                            slotProps={{
                                                textField:{
                                                    size:"small"
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={'bold'}>Description:</Typography>
                                        <TextField 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth={true} 
                                            value={values.description}
                                            onChange={handleChange}
                                            rows={3}
                                            multiline
                                            sx={{
                                                fieldset: { 
                                                    borderColor: "#7DAFDB" 
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{display:'flex', alignSelf:"center", gap:2, mt:"10px"}}>
                                        <Button variant="outlined" sx={{
                                            borderColor:"#104C82", 
                                            backgroundcolor:"#104C82", 
                                            borderRadius:"10px",
                                            width:"130px",
                                            fontWeight:"bold",
                                            height:"40px"
                                            }}
                                        >
                                            <Typography fontSize={"12px"} color={"#104C82"} fontWeight={'bold'}>Save</Typography>
                                        </Button>
                                        <Button variant="contained" sx={{
                                            color:"#104C82",
                                            borderRadius:"10px",
                                            width:"130px",
                                            fontWeight:"bold",
                                            height:"40px",
                                            backgroundcolor:"#FFFFFF", 
                                            }}
                                        >
                                            <Typography fontSize={"12px"} color={"white"} fontWeight={'bold'}>Save & Done</Typography>
                                        </Button>
                                    </Box>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CRUDDialog