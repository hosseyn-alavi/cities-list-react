import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

type CityItem = {
    city: string;
    country: string;
    populationCounts: {
        reliabilty: string;
        sex: string;
        value: string;
        year: string;
    }[];
};

export function CityTable() {
    const [cities, setCities] = useState<CityItem[]>([]);

    async function getList() {
        try {
            const list = await axios.get<
                unknown,
                AxiosResponse<{data: CityItem[]}>
            >(
                "https://countriesnow.space/api/v0.1/countries/population/cities"
            );


            setCities(list.data.data)
        } catch (err) {
            console.log("Error happened", err);
        }
    }

    useEffect(()=>{
        getList()
    },[])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table style={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities.map((row) => {
                            return (
                                <TableRow key={row.city}>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>{row.country}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
