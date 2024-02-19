import { Box, Card, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { MomentInput } from "moment";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IFilter {
    price: number,
    start_date: string,
    end_date: string,
    brand: string,
    model: string,
    operating_system: string,
    storage_capacity: string,
    screen_size: string,
    camera_quality: string,
    battery_capacity: string,
}

interface ISidebarProps {
    filter: IFilter,
    setFilter: Dispatch<SetStateAction<IFilter>>;
}


const SidebarFilter = ({ filter, setFilter }: ISidebarProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFilter(prevData => ({
            ...prevData,
            [name]: value ? value : "",
        }))
    }

    return (
        <Card sx={{ borderRadius: "10px", minHeight: "calc(100vh - 188px)", p: { xs: 2, md: 4 } }}>

            <Box >
                <Typography variant="button">
                    Price Range
                </Typography>
                <Slider
                    max={1000}
                    defaultValue={1000}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    name="price"
                    onChange={(_, value) =>
                        setFilter(prevData => ({
                            ...prevData,
                            price: value as number,
                        }))}
                />
                <DatePicker
                    name="startDate"
                    label="Release Start Date"
                    onChange={(e: MomentInput) =>
                        setFilter(prevData => ({
                            ...prevData,
                            start_date: e ? moment(e).format("YYYY-MM-DD") : ""
                        }))}
                    closeOnSelect
                    slotProps={{
                        textField: {
                            margin: "normal",
                            fullWidth: true,
                            size: "small",
                        },
                        field: {
                            clearable: true,
                        }
                    }}
                    maxDate={filter.end_date ? moment(filter.end_date) : undefined}
                />
                <DatePicker
                    name="endDate"
                    label="Release End Date"
                    onChange={(e: MomentInput) =>
                        setFilter(prevData => ({
                            ...prevData,
                            end_date: e ? moment(e).format("YYYY-MM-DD") : ""
                        }))}
                    closeOnSelect
                    slotProps={{
                        textField: {
                            margin: "normal",
                            fullWidth: true,
                            size: "small",
                        },
                        field: {
                            clearable: true,
                        }
                    }}
                    minDate={filter.start_date ? moment(filter.start_date) : undefined}
                />
                <TextField
                    margin="normal"
                    name="brand"
                    label="Brand Name"
                    fullWidth
                    size="small"
                    value={filter.brand}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    name="model"
                    label="Model Name"
                    fullWidth
                    size="small"
                    value={filter.model}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    name="operating_system"
                    label="Operating System"
                    fullWidth
                    size="small"
                    value={filter.operating_system}
                    onChange={handleChange}
                />
                <FormControl
                    fullWidth
                    margin="normal"
                    size="small"
                >
                    <InputLabel id="filter-storage">Storage Capacity (GB)</InputLabel>
                    <Select
                        labelId="filter-storage"
                        value={filter.storage_capacity}
                        label="Storage Capacity (GB)"
                        onChange={(e) =>
                            setFilter(prevData => ({
                                ...prevData,
                                storage_capacity: e?.target?.value,
                            }))}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={64}>{`> 64`}</MenuItem>
                        <MenuItem value={128}>{`> 128`}</MenuItem>
                        <MenuItem value={256}>{`> 256`}</MenuItem>
                        <MenuItem value={512}>{`> 512`}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    size="small"
                >
                    <InputLabel id="filter-screen">Screen Size (Inches)</InputLabel>
                    <Select
                        labelId="filter-screen"
                        value={filter.screen_size}
                        label="Screen Size (Inches)"
                        onChange={(e) =>
                            setFilter(prevData => ({
                                ...prevData,
                                screen_size: e?.target?.value,
                            }))}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={4}>{`> 4`}</MenuItem>
                        <MenuItem value={5}>{`> 5`}</MenuItem>
                        <MenuItem value={6}>{`> 6`}</MenuItem>
                        <MenuItem value={7}>{`> 7`}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    size="small"
                >
                    <InputLabel id="filter-camera">Camera Quality (MP)</InputLabel>
                    <Select
                        labelId="filter-camera"
                        value={filter.camera_quality}
                        label="Camera Quality (MP)"
                        onChange={(e) =>
                            setFilter(prevData => ({
                                ...prevData,
                                camera_quality: e?.target?.value,
                            }))}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={30}>{`> 30`}</MenuItem>
                        <MenuItem value={40}>{`> 40`}</MenuItem>
                        <MenuItem value={50}>{`> 50`}</MenuItem>
                        <MenuItem value={60}>{`> 60`}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    size="small"
                >
                    <InputLabel id="filter-battery">Battery Capacity (mAh)</InputLabel>
                    <Select
                        labelId="filter-battery"
                        value={filter.battery_capacity}
                        label="Battery Capacity (mAh)"
                        onChange={(e) =>
                            setFilter(prevData => ({
                                ...prevData,
                                battery_capacity: e?.target?.value,
                            }))}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={3000}>{`> 3000`}</MenuItem>
                        <MenuItem value={4000}>{`> 4000`}</MenuItem>
                        <MenuItem value={5000}>{`> 5000`}</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Card>
    );
};

export default SidebarFilter;