import React, {useState, useEffect, useRef} from "react";
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import { getUser, updateUser } from "../../Middleware";
import styles from "./styles";
import Box from "@mui/material/Box";
