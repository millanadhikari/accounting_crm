import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import UserTable from "./UserTable";
import {fetchAllUsers} from './usersAction'
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AddUsers } from "./AddUsers";

const data = [
  {
    id:'01',
    name:"df Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: true,
    isTeam:true,
    phone:"0434343433",
    photo:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYYGRgaGhwcHRwaHBocIRohHBweHiEhHh4eIS4lIR4rIR4cJjgmKy8xNTU1ISQ7QDs0Py40NTEBDAwMDw8PEREPEDEdGB0xMTExND80MT80MTQ0MTE/MTQxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAP0AxwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAACAQIDBQQHBgUFAQEAAAABAgADEQQSIQUxQVFhBiJxkRMyUoGh0fAHFEKSscEVcoLh8SMzYrLConP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMMTG3aKYRs7oBM8AeIaEVgLNSJLwiIcAXgLQIhO4ePIQ2pkC5IEBDPEF4ouOGvXhAr25frAaYmIZpOp4wjkfj/iG+KVvWRfK0CuZoktLAik2mRlPMNceR+cDbIZhdDmHL8XlxgVbNE5ourTKkgixG8RkGAvNCvCEMwDzRN4ZETaAYMWrRAihAUXMGbhGzDMBamCIV+cEIvmMQItjGWaFE4hqv0Yi8WN0BJEO2lzoIZe2siV6haBIrbRsMiCwHxPMyG1YneTGysJkMBeeKD8/KNIhvJC4VjwgEKg/wACKV+UUmznJsFPuEkPseoAO6Rfx8gOMBoVD4xxMUVNwLHmNIy+DdPWVvKCm3O463EDRYTH0cQMlcKTawcjvDfv5yk25sN6LXAuh1UjcRfh16Qlo3N1db9SB8Zqdi4pXQ4auvrDuX4+/iORG49DoHPwYqSNq4E0qjIRuOnUSIICjCMEBgJjgiSId4BmEYLwQEwQjBAvyI0Y4d0acwEkww0bcxtqth13CA5XcDQaniYwCN5/zGLwy3CBITvfPkOMk4bDhjpujCCyhRvff4f3lzgKYAAH15/tAVTwi6WH175ocDs5CNV4Srp0iuplhhsQbgQL/ZmEQbgDyH95d0tnoQO6AeJA3ymwba7zaaDBPpAIbCpPoyA+IkHHdg8O+5cnhNJhxeTqaQOTbU+zt6QLUjn6aX/TWZNmegxSsjKLg6cDzA4GeiQkzvafsnRxSEFQHtowGogcg26q4ij6RDmdN53EjqOBGm64OvK0yNpebQwVbAYg0n05cmXwO+VeLQBzYWDai3IwGCIoQNAYCWiM0NjEiAq8O8IQAQBeCJMEDRW0jDyQ8YeBHeQ6x70nMsgVN8BAENN8TDUQJqt3z7lHulvhap4XlDSbUe+T8NWIEDUYepcC/wDmOU9Dfr9CV+GckSwwxvvH15QNDs6pfheX2CGnSZTB1gpGv17hNDh61wLfXXX3+cDQYZ90sqVS8zNKr9b5d4OpAsQ0DNCWNVGtAyP2k9mvveHZkW9an30tva29fePjacKLZkU8RcT0+t984R9oOxhhsZVC6JUtVTpmJDD3MD5iBlSIlooxDiA0YFhtCEBQilMSIAIQZEEJhBA0LkRlzHWjDiFEwldWGssGkHEjjAZhqIFEWogLRZZ4PDWsTvPCQKQ1B3y+wq6AnefgDAfoU+Pyjwrn3/v0jRPKMltYFjhKjM4A13Te7Lwugvvtr7vGYLZWKWndiLtwv+stKW3KrnKt7HXTTdwgb2nRXh7+kfRiACL7/ozN+grmmSjgEXuCwB05675B2ftaupLuWdAT6mVgPEg6iB0xG0HgIxW3++3mDMhgO1grVkoU1OYm7sRYKo4AX1JM0G0MTkZCTZSzEnoB/eBZgzB/avsX0uG9Og79G5PVGtm8iAfOS8T2yRQxQA2Ombj1A5dZY4HbKYin3rZXBUre+8ag+4wPO8baPV6eRmT2WZfI2jTQGjAIbQoB3gUwhDgLggghF0TEMYoiERCmzDpbOetcIL5RckmwUdTCmz2dQCbPzjfUZy3UKQg/eBin2NVAJUK4HsMD8j8JGyFd4t0M0FZWpr6VDrexX2hpvjGPxSVO9lsSNYFTQEu6b3AA5SnoDWWtEcukCcRpeLw2G4kaW/eIRhcXmm2VTQqTbhpv38N0DM1sNvd2ygahfxEdB87SdsgVajKArU6baB6drnh3nGq8dNIWP2ayVA5BYE3N+J980eydnUmIdFZSdSFBFidPw8Li+6AXZ3sw1mSslTMSheobqoCuSWSoHsQy2GUqTex5yJtr0+GVqoTcCtQ62qpqA+o9cafO03+GQKOJtqLkmZvtzi1fDOlySwH6j/HnAxXYXH5cSDffztznU+0Ks1NVRlUnW5AJ0H4QdL+c4lgc1JlcG1jOw9ntpfeKK31NviP3gZXHdnUApuzkBjdyzAEnOtxnYMFOXMRcWJAGka++VcEuIDu9SmKRZPSWupZ8qagb2GvLS9p0jD3I33HP5zGfavhQMGXuSTUp3PMXYC/heBxmoxNyd51iDFtENAbYQCHaHATFCFeETAXmgiAYIRewMYoiJIhSCJqdl4vNgK1P8VO7D+Vtb/mB85l2lhsTFZKgue5UBR+Vm0+BtAn01AwwqGzM18o4aTOUkZ6ra3O8+6X1ilN6LetTZit/xKdxHwlNRV0cOitYm264IO+AyUysR1k7DGRcR67cdTJGGECWDulxszFkEAmU6bx0ljh6evHlA6Hs8I6C4Gv0Y8mx1Q9wkDfa5t1Nryi2ZisqgXtLVdqcBAn4lyoszADkP8zF7fJyl2PdubaW1msRM5BY3+uXGYH7QdpXqLQTcoubczzgZvG1wTYbhNp9n2LyuFvoZh/Rg6E3l9sKrkdbaHygdiw9MozAHuk6DleZ77TqQfZ1Y+yUbydfnL3B3yKWINwN2+Zj7VsaEwDJxqOiDqA2c/BYHD2MbjjRGkAxEmOgQMIDBMKLKwrQEwQ4IGhicsdyxBEBsw7RSiAwJOJrioiK3rAgE8bc5cJTCYd1S54W33MzqtLXDbeCLYoS/jofHS8CnxNAo+U77A+YvJFAyHUrs7s7m7MbmSqbW16QJGa1ppdioret04zMDXWXGxquVoGhxdGxuNB0GkZw7EEW3XkwsGG/65xaYXTTjAssNjcqE8h4W3zk23mY12d/xm83VfGZVZeJ004DjOe7ZqEvrqOHhAeqYgIVSnlZyLlibgX3Cw42/WWOEwGKUtUdFVEsWN7HUgCwub7x0mdwFMZgSdL8eV9ZertZm9IimyuMo5dwCzW4XI4Ea9IHWey2Iq1EDuhRALJc6vbjYcOvwmM+2XFd7DU+ADufG4Uf+pY9gXrGu6F/9JFJtvDZrWIbXW97i/u0mY+1vEZscE9ikg97FmP6iBhmiLxbREBaPAzRCw2gFngvCMOEFBDCwQrSEQmMUREtAa4wNAYG3wCIkau2o8JJJvImIPegENDJqNccpD4XkjDvAfDS0wF7iVDmxk/AVrMBA1WGxHE/Wku6FcZCekx9bEWl3sSrnXJz0gRaWFZ3bqZWbb7PAd64vxN+HGbxMKqJxuPOZHauxszl3Z2ud2ZwB4a7oFVgdj0swdnA5IOQHtcBccDNBsLs5hUzu1YtnGXLp/pkkHQ634eUsuy+x6armyK3HvAHXxOs1eFK91TSRVIvoBp7oB7J2XToKBTA7wGZgBdraC84P2wxnpsdiXG41GUeC2T/AMzv1QLSR3AAAVnNtB3VJnmhmLd472Nz4nU/vAS8bi2gtCCURQgijCmiIYSGBeOqkBsLBHSIIF2TEMYspxiMsBBi8ukAWOhYAwdJWYBzYfX7yDtDBPTazjQ6q3Bh0MViKmthw/WbDszjaWIT7vXUNpoDx6qeDDpAxFAX05xxEImv212DqJd8MTVTfk/GvgPxDw16GZxE1NwQV0YcR7jxgNPqOsVgnsw1jlSlkI4qdxja07G/DfAt67XW8suzuJAbrKiiSVI4WkZq5RrDzgdQrVLgEfX1ujlLDZxqARMdsnbjEZXDW52P1aa3Zu0VIIO+BYYXBFRlT5S2oUjYXHCQsDVW98w95EtKeKTdmXzEDO9vsd6HAVzexdfRr4ucv6En3TgRE6T9r21WepTwyAslMZ3KgkF20Uaclv8AmnNzRf2H/K3ygNvEEx70L+w/5W+UJsO/sP8Alb5QGg0GaL+7v7D/AJW+UP7u/sP+VvlAJTHVMSlB/Yf8rfKOLQf2H/K3ygFBFig/sP8Alb5QQLxzGmHvjzLGnMAKogqtYdYkVLacbaSObk3gAJAhZGDKSCNQRwkujTuIt8NeB0Xsb2iGIGRjlrKN24OOY/cTR7T2Hh8TrVQZ+Dr3XH9Q3jobicRpl6bh0JVlNwRoQRrpOu9ju0q4pMjWFZB3l3ZgPxr+44QKHaPYCooPoWFVD+A2V18L6H4THYnAvQfJVRlPAsCvnf8AXdO9IDwicbs+nWQpVRHU8GAPly90DhyU7DS4kPFUC3SdRx/YNBrh3Kj2HJYD+V9499/GZ7Fdn3TR0IPPeD4HdAh7A2P6bNmfIEVCWsCO8wW5zMoCi9zrew0Bl3gNkAZGaqCrIzZRlzhfRu6NlzEn1BcWG8AE7wvYGGdC5QhSAvrB9bXI1VlsLjW+nMSbSwGIBX/WAszFQC4Ck5r2GWwFi+m7UiA9h8IpPcckCkjtmW2jKzFgL9Bp/wAhE4rE0kJBclswXKoBtmqGmL97dccesr9r1cRTR6SPTUhApZmfOEOoVO7YXItc8uA1mEbEuTcu999yxvoxb/sSfE3gXFfZrVSajOc5OZ0AUkXQuoUZ/ZWwz5dLG2to3V2OinWutjrc5NVDlCbByb3BO7Lb8Uh4fatVLd9mABUBmewuLaZWBBtpcEG2m7SJrbUqsSc7i5BsrMACLW43vpe5uSdTc6wG8dSVGCgHQA3JU5swDAjKStrEagkHfI5MVVqM7FmJYneSbk++IgCHCgEA7xQMSIdoCwYIQggEtMueAHMyxpbHuLi55k6SfgdiHMM2s0dDC5VtaBzXaeEyEgb118YnD0M9iu5t3jxEve0dLLVD203EdOsg4akKNRVP+zWsUa/+2/I+/SAdHDWHL94/6GXBwy7zobkEciOXO8D4cW0gU1TCAiMYTPRdXQlWU3BH1rL00x9eEQ2HBEDp3ZvayYmkHGjgAOvI9OhlvkM5PsXEvh6gdDbgRwYciJ1PZm0UrpnXfxHFT8usB7LCamCLEAjrJGWERApcTsCkbsBbeTqbf2h7O2Zh2BKlXINjlY6Hkdb9ZL21ihTw9RyQAFt72IUfEiZvYGNy1VItZrI3UE93xsx9125wOX/aQj0MZUZCPRu3d0BsVVQwv4gzKfxOp7Q8lnRMfhfvNKrSf/czuQeTozX8yDOYOpBIOhBsQeFoEk7Tq+0Pyj5QfxSp7Q/KPlIRggS/4pV9oflEH8Uqe0PIfKRCIIEz+K1PaHkPlDG1KntDyHykG8MGBN/ilX2h+URY2lU9oeQ+UrwY6IE3+I1PaHkIJDsYIHe6IC8vGKve+79Yyz6XiLmBR7YwpckWHL6+EqX2fem1Jx3TuPsngRaa2pu4SrxiaawIfZ7FF0NNz/q0iFc+0n4H/Yyxeh08ZlsVVahVTEKL5bq49tG9Yfv7puEKsoYNdSAVO+6nUHy49DApnpG/6Ra0rcJY1KQvG3X4QIbIPrSXnZfGlGPjuPHpK5Uv5RKMUbjv/wA/vA6nRqh1DLuPwhOJl9h7WCtYnunf06zUk31gc5+2DaZShRore9RyzafhpjQX4XZlP9JmP7JbfYV0RjobAHrwnQPtFw6ejZ6ilkyFWtvUHcwvxVrGcNp1nTvpYFCLE89dQIHRtto1HH1gB3HK1kt/zF2/+g0yHbPY7LV9MiHJUGY6eq3ETYYjF/eaGExI9Yo1NydNVPzDecuqVMPQFwCRA4W6W3i0KdV2hsCi+9QOomU2l2QdblDfoYGVvCEfxOEdDZ1IMZAgERDgMFoBLvjqxtRHbQDBghGCB3g390bvFb90aYawAVvGHw+a9uA4yWFihT8LwM3jcICpU7jpG+xeJuj4djdqDWGuppudPyt8Jf4nDA301+cxtZ/uuPp1T6lS6Pyyv3TfwOU+6BtgBYiIK/Qi69MhjzGhPh8xbzja8RAUtPX5xFenmK26m0fojgfDlFogLMTuAtf68YEUXXUDxmq7O7XBGRz/ACk/pM1UPHj04xmhXynSBafaviMmCbS+dlXz/sJwuge+O7m19XnOydv8UK2ynP40anfqM4W/x1nLti4W9RWPMQOrbOw2Gr4W3+pQNJQ70yFYoBrmSw76GzWI+BBEibExatnVSSlzlLCxI4ac5P2BRZ3rI9wlREVHQ6gDMGQjhcvm63N9wmR2KWoV3ov6yOyHrlNr+Btf3wNNWoWvb6vI9WgJPc3jTCBVYjZaOCHUH65zO4/sKrXNNsp5GbhVtHlUQOHbS2a9FijqRIeWdl7Q7ISuhDCx/CZyLHYVqTsjbwYDAgJgBiTAWsECwQO54Z7iKqKT9eEjYN9B4Sc3X94Ao6j6/ePBYzTJ+vrwki/1eA26fL66TCdusLmpZt9j/adAyEym2xsz0iMlt4I18IA7PY/7xhaNQm7FAr/z0+6b+NgZO9D7/DjMr2d2ZicKHQNTKOb2YM1iOIAt5S5LuxGdyeYACjyG/wDqJgTMVjaVFGd2sEFzYFiLdFvbjBhMQGQPqM4D2IsQG3BteVpU7bo5xRwqj/ddQ1uCJ3nv0IGX+qWY9csN19PAC1h00gOV20uPL64SI2p13yTiFtqJFeA+lBKiPRcXSoCrcwDy6g2IMyCbJag5R9SpFmto6n1W8CPI3E1+Hcb/AKEd2pgvTUrj16YuP+S8R+4/vAe2FUOg5cZlO3FYU9p5xoKlNHPjbKf+omm2G4Gkxv2okriaX8hseha/wN/OBr8PVDID0EeQym7MYkPSHE2ltYi5HKATnKYum95Awe00rZlAKuhsytoR8x1jociA9j/9skcNZzvtrhc6pXUb9GnRX7yN1W0y9Kmr4d6bbsxHhygcxWHHsXhyjlTwMaEA1EECiCB2TZ9JnQFbaFRqbXLG3l1lrSos4BXLqAd9jrfgRf8AyJQ4Ks3obgkXF9Cd41EtcLVIpghmFwNzEcLcPCBNpYd7XsNLX73EgEfqBbiY6txdWWxGXjrqL+4yNh1IFsze4kdN1+Wkforlvbp8LiBIpvu0iMQtuECb5IqjQQIT0gw6npK7EUst+l5eYX9JX7f7tN2G8AkeUDP7CcvWxOJ4IBh6R5MbF2F/6T4KZeogCgbrAD3bvKVfY6iDgKLbjnqMerNfveIBI98tH58oCXSwy8OEhsupBk86r8Y2q33630gRkQg/A9ZY4R7bpHK6eGkUi247vnAU1DJUzL6rm/geI8OPvma+1jCg0KFYb0fIf5XW/wCqibCmuZWBO4Eg9QLzK/aI5+4H/wDSn/2gU/YTF37k3JTlOWdjaxWqLTrg1tAq32emcuFAYixO68N6HCWjUxGai7ut/wBYEamvAzLvh2ppWvp37jwmwNMSr7V0x6AniSBA5d2spWqK4GjLKQCdB7WYNThUbioFvfMAogGsEOCB/9k="

  },
  {
    id:'02',
    name:"Cayla Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: false,
    isTeam:true,
    phone:"0434343433"

  },
  {
    id:'03',
    name:"Cayla Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: false,
    isTeam:true,
    phone:"0434343433"

  },
  {
    id:'01',
    name:"df Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: true,
    isTeam:true,
    phone:"0434343433",
    photo:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYYGRgaGhwcHRwaHBocIRohHBweHiEhHh4eIS4lIR4rIR4cJjgmKy8xNTU1ISQ7QDs0Py40NTEBDAwMDw8PEREPEDEdGB0xMTExND80MT80MTQ0MTE/MTQxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAP0AxwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAACAQIDBQQHBgUFAQEAAAABAgADEQQSIQUxQVFhBiJxkRMyUoGh0fAHFEKSscEVcoLh8SMzYrLConP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMMTG3aKYRs7oBM8AeIaEVgLNSJLwiIcAXgLQIhO4ePIQ2pkC5IEBDPEF4ouOGvXhAr25frAaYmIZpOp4wjkfj/iG+KVvWRfK0CuZoktLAik2mRlPMNceR+cDbIZhdDmHL8XlxgVbNE5ourTKkgixG8RkGAvNCvCEMwDzRN4ZETaAYMWrRAihAUXMGbhGzDMBamCIV+cEIvmMQItjGWaFE4hqv0Yi8WN0BJEO2lzoIZe2siV6haBIrbRsMiCwHxPMyG1YneTGysJkMBeeKD8/KNIhvJC4VjwgEKg/wACKV+UUmznJsFPuEkPseoAO6Rfx8gOMBoVD4xxMUVNwLHmNIy+DdPWVvKCm3O463EDRYTH0cQMlcKTawcjvDfv5yk25sN6LXAuh1UjcRfh16Qlo3N1db9SB8Zqdi4pXQ4auvrDuX4+/iORG49DoHPwYqSNq4E0qjIRuOnUSIICjCMEBgJjgiSId4BmEYLwQEwQjBAvyI0Y4d0acwEkww0bcxtqth13CA5XcDQaniYwCN5/zGLwy3CBITvfPkOMk4bDhjpujCCyhRvff4f3lzgKYAAH15/tAVTwi6WH175ocDs5CNV4Srp0iuplhhsQbgQL/ZmEQbgDyH95d0tnoQO6AeJA3ymwba7zaaDBPpAIbCpPoyA+IkHHdg8O+5cnhNJhxeTqaQOTbU+zt6QLUjn6aX/TWZNmegxSsjKLg6cDzA4GeiQkzvafsnRxSEFQHtowGogcg26q4ij6RDmdN53EjqOBGm64OvK0yNpebQwVbAYg0n05cmXwO+VeLQBzYWDai3IwGCIoQNAYCWiM0NjEiAq8O8IQAQBeCJMEDRW0jDyQ8YeBHeQ6x70nMsgVN8BAENN8TDUQJqt3z7lHulvhap4XlDSbUe+T8NWIEDUYepcC/wDmOU9Dfr9CV+GckSwwxvvH15QNDs6pfheX2CGnSZTB1gpGv17hNDh61wLfXXX3+cDQYZ90sqVS8zNKr9b5d4OpAsQ0DNCWNVGtAyP2k9mvveHZkW9an30tva29fePjacKLZkU8RcT0+t984R9oOxhhsZVC6JUtVTpmJDD3MD5iBlSIlooxDiA0YFhtCEBQilMSIAIQZEEJhBA0LkRlzHWjDiFEwldWGssGkHEjjAZhqIFEWogLRZZ4PDWsTvPCQKQ1B3y+wq6AnefgDAfoU+Pyjwrn3/v0jRPKMltYFjhKjM4A13Te7Lwugvvtr7vGYLZWKWndiLtwv+stKW3KrnKt7HXTTdwgb2nRXh7+kfRiACL7/ozN+grmmSjgEXuCwB05675B2ftaupLuWdAT6mVgPEg6iB0xG0HgIxW3++3mDMhgO1grVkoU1OYm7sRYKo4AX1JM0G0MTkZCTZSzEnoB/eBZgzB/avsX0uG9Og79G5PVGtm8iAfOS8T2yRQxQA2Ombj1A5dZY4HbKYin3rZXBUre+8ag+4wPO8baPV6eRmT2WZfI2jTQGjAIbQoB3gUwhDgLggghF0TEMYoiERCmzDpbOetcIL5RckmwUdTCmz2dQCbPzjfUZy3UKQg/eBin2NVAJUK4HsMD8j8JGyFd4t0M0FZWpr6VDrexX2hpvjGPxSVO9lsSNYFTQEu6b3AA5SnoDWWtEcukCcRpeLw2G4kaW/eIRhcXmm2VTQqTbhpv38N0DM1sNvd2ygahfxEdB87SdsgVajKArU6baB6drnh3nGq8dNIWP2ayVA5BYE3N+J980eydnUmIdFZSdSFBFidPw8Li+6AXZ3sw1mSslTMSheobqoCuSWSoHsQy2GUqTex5yJtr0+GVqoTcCtQ62qpqA+o9cafO03+GQKOJtqLkmZvtzi1fDOlySwH6j/HnAxXYXH5cSDffztznU+0Ks1NVRlUnW5AJ0H4QdL+c4lgc1JlcG1jOw9ntpfeKK31NviP3gZXHdnUApuzkBjdyzAEnOtxnYMFOXMRcWJAGka++VcEuIDu9SmKRZPSWupZ8qagb2GvLS9p0jD3I33HP5zGfavhQMGXuSTUp3PMXYC/heBxmoxNyd51iDFtENAbYQCHaHATFCFeETAXmgiAYIRewMYoiJIhSCJqdl4vNgK1P8VO7D+Vtb/mB85l2lhsTFZKgue5UBR+Vm0+BtAn01AwwqGzM18o4aTOUkZ6ra3O8+6X1ilN6LetTZit/xKdxHwlNRV0cOitYm264IO+AyUysR1k7DGRcR67cdTJGGECWDulxszFkEAmU6bx0ljh6evHlA6Hs8I6C4Gv0Y8mx1Q9wkDfa5t1Nryi2ZisqgXtLVdqcBAn4lyoszADkP8zF7fJyl2PdubaW1msRM5BY3+uXGYH7QdpXqLQTcoubczzgZvG1wTYbhNp9n2LyuFvoZh/Rg6E3l9sKrkdbaHygdiw9MozAHuk6DleZ77TqQfZ1Y+yUbydfnL3B3yKWINwN2+Zj7VsaEwDJxqOiDqA2c/BYHD2MbjjRGkAxEmOgQMIDBMKLKwrQEwQ4IGhicsdyxBEBsw7RSiAwJOJrioiK3rAgE8bc5cJTCYd1S54W33MzqtLXDbeCLYoS/jofHS8CnxNAo+U77A+YvJFAyHUrs7s7m7MbmSqbW16QJGa1ppdioret04zMDXWXGxquVoGhxdGxuNB0GkZw7EEW3XkwsGG/65xaYXTTjAssNjcqE8h4W3zk23mY12d/xm83VfGZVZeJ004DjOe7ZqEvrqOHhAeqYgIVSnlZyLlibgX3Cw42/WWOEwGKUtUdFVEsWN7HUgCwub7x0mdwFMZgSdL8eV9ZertZm9IimyuMo5dwCzW4XI4Ea9IHWey2Iq1EDuhRALJc6vbjYcOvwmM+2XFd7DU+ADufG4Uf+pY9gXrGu6F/9JFJtvDZrWIbXW97i/u0mY+1vEZscE9ikg97FmP6iBhmiLxbREBaPAzRCw2gFngvCMOEFBDCwQrSEQmMUREtAa4wNAYG3wCIkau2o8JJJvImIPegENDJqNccpD4XkjDvAfDS0wF7iVDmxk/AVrMBA1WGxHE/Wku6FcZCekx9bEWl3sSrnXJz0gRaWFZ3bqZWbb7PAd64vxN+HGbxMKqJxuPOZHauxszl3Z2ud2ZwB4a7oFVgdj0swdnA5IOQHtcBccDNBsLs5hUzu1YtnGXLp/pkkHQ634eUsuy+x6armyK3HvAHXxOs1eFK91TSRVIvoBp7oB7J2XToKBTA7wGZgBdraC84P2wxnpsdiXG41GUeC2T/AMzv1QLSR3AAAVnNtB3VJnmhmLd472Nz4nU/vAS8bi2gtCCURQgijCmiIYSGBeOqkBsLBHSIIF2TEMYspxiMsBBi8ukAWOhYAwdJWYBzYfX7yDtDBPTazjQ6q3Bh0MViKmthw/WbDszjaWIT7vXUNpoDx6qeDDpAxFAX05xxEImv212DqJd8MTVTfk/GvgPxDw16GZxE1NwQV0YcR7jxgNPqOsVgnsw1jlSlkI4qdxja07G/DfAt67XW8suzuJAbrKiiSVI4WkZq5RrDzgdQrVLgEfX1ujlLDZxqARMdsnbjEZXDW52P1aa3Zu0VIIO+BYYXBFRlT5S2oUjYXHCQsDVW98w95EtKeKTdmXzEDO9vsd6HAVzexdfRr4ucv6En3TgRE6T9r21WepTwyAslMZ3KgkF20Uaclv8AmnNzRf2H/K3ygNvEEx70L+w/5W+UJsO/sP8Alb5QGg0GaL+7v7D/AJW+UP7u/sP+VvlAJTHVMSlB/Yf8rfKOLQf2H/K3ygFBFig/sP8Alb5QQLxzGmHvjzLGnMAKogqtYdYkVLacbaSObk3gAJAhZGDKSCNQRwkujTuIt8NeB0Xsb2iGIGRjlrKN24OOY/cTR7T2Hh8TrVQZ+Dr3XH9Q3jobicRpl6bh0JVlNwRoQRrpOu9ju0q4pMjWFZB3l3ZgPxr+44QKHaPYCooPoWFVD+A2V18L6H4THYnAvQfJVRlPAsCvnf8AXdO9IDwicbs+nWQpVRHU8GAPly90DhyU7DS4kPFUC3SdRx/YNBrh3Kj2HJYD+V9499/GZ7Fdn3TR0IPPeD4HdAh7A2P6bNmfIEVCWsCO8wW5zMoCi9zrew0Bl3gNkAZGaqCrIzZRlzhfRu6NlzEn1BcWG8AE7wvYGGdC5QhSAvrB9bXI1VlsLjW+nMSbSwGIBX/WAszFQC4Ck5r2GWwFi+m7UiA9h8IpPcckCkjtmW2jKzFgL9Bp/wAhE4rE0kJBclswXKoBtmqGmL97dccesr9r1cRTR6SPTUhApZmfOEOoVO7YXItc8uA1mEbEuTcu999yxvoxb/sSfE3gXFfZrVSajOc5OZ0AUkXQuoUZ/ZWwz5dLG2to3V2OinWutjrc5NVDlCbByb3BO7Lb8Uh4fatVLd9mABUBmewuLaZWBBtpcEG2m7SJrbUqsSc7i5BsrMACLW43vpe5uSdTc6wG8dSVGCgHQA3JU5swDAjKStrEagkHfI5MVVqM7FmJYneSbk++IgCHCgEA7xQMSIdoCwYIQggEtMueAHMyxpbHuLi55k6SfgdiHMM2s0dDC5VtaBzXaeEyEgb118YnD0M9iu5t3jxEve0dLLVD203EdOsg4akKNRVP+zWsUa/+2/I+/SAdHDWHL94/6GXBwy7zobkEciOXO8D4cW0gU1TCAiMYTPRdXQlWU3BH1rL00x9eEQ2HBEDp3ZvayYmkHGjgAOvI9OhlvkM5PsXEvh6gdDbgRwYciJ1PZm0UrpnXfxHFT8usB7LCamCLEAjrJGWERApcTsCkbsBbeTqbf2h7O2Zh2BKlXINjlY6Hkdb9ZL21ihTw9RyQAFt72IUfEiZvYGNy1VItZrI3UE93xsx9125wOX/aQj0MZUZCPRu3d0BsVVQwv4gzKfxOp7Q8lnRMfhfvNKrSf/czuQeTozX8yDOYOpBIOhBsQeFoEk7Tq+0Pyj5QfxSp7Q/KPlIRggS/4pV9oflEH8Uqe0PIfKRCIIEz+K1PaHkPlDG1KntDyHykG8MGBN/ilX2h+URY2lU9oeQ+UrwY6IE3+I1PaHkIJDsYIHe6IC8vGKve+79Yyz6XiLmBR7YwpckWHL6+EqX2fem1Jx3TuPsngRaa2pu4SrxiaawIfZ7FF0NNz/q0iFc+0n4H/Yyxeh08ZlsVVahVTEKL5bq49tG9Yfv7puEKsoYNdSAVO+6nUHy49DApnpG/6Ra0rcJY1KQvG3X4QIbIPrSXnZfGlGPjuPHpK5Uv5RKMUbjv/wA/vA6nRqh1DLuPwhOJl9h7WCtYnunf06zUk31gc5+2DaZShRore9RyzafhpjQX4XZlP9JmP7JbfYV0RjobAHrwnQPtFw6ejZ6ilkyFWtvUHcwvxVrGcNp1nTvpYFCLE89dQIHRtto1HH1gB3HK1kt/zF2/+g0yHbPY7LV9MiHJUGY6eq3ETYYjF/eaGExI9Yo1NydNVPzDecuqVMPQFwCRA4W6W3i0KdV2hsCi+9QOomU2l2QdblDfoYGVvCEfxOEdDZ1IMZAgERDgMFoBLvjqxtRHbQDBghGCB3g390bvFb90aYawAVvGHw+a9uA4yWFihT8LwM3jcICpU7jpG+xeJuj4djdqDWGuppudPyt8Jf4nDA301+cxtZ/uuPp1T6lS6Pyyv3TfwOU+6BtgBYiIK/Qi69MhjzGhPh8xbzja8RAUtPX5xFenmK26m0fojgfDlFogLMTuAtf68YEUXXUDxmq7O7XBGRz/ACk/pM1UPHj04xmhXynSBafaviMmCbS+dlXz/sJwuge+O7m19XnOydv8UK2ynP40anfqM4W/x1nLti4W9RWPMQOrbOw2Gr4W3+pQNJQ70yFYoBrmSw76GzWI+BBEibExatnVSSlzlLCxI4ac5P2BRZ3rI9wlREVHQ6gDMGQjhcvm63N9wmR2KWoV3ov6yOyHrlNr+Btf3wNNWoWvb6vI9WgJPc3jTCBVYjZaOCHUH65zO4/sKrXNNsp5GbhVtHlUQOHbS2a9FijqRIeWdl7Q7ISuhDCx/CZyLHYVqTsjbwYDAgJgBiTAWsECwQO54Z7iKqKT9eEjYN9B4Sc3X94Ao6j6/ePBYzTJ+vrwki/1eA26fL66TCdusLmpZt9j/adAyEym2xsz0iMlt4I18IA7PY/7xhaNQm7FAr/z0+6b+NgZO9D7/DjMr2d2ZicKHQNTKOb2YM1iOIAt5S5LuxGdyeYACjyG/wDqJgTMVjaVFGd2sEFzYFiLdFvbjBhMQGQPqM4D2IsQG3BteVpU7bo5xRwqj/ddQ1uCJ3nv0IGX+qWY9csN19PAC1h00gOV20uPL64SI2p13yTiFtqJFeA+lBKiPRcXSoCrcwDy6g2IMyCbJag5R9SpFmto6n1W8CPI3E1+Hcb/AKEd2pgvTUrj16YuP+S8R+4/vAe2FUOg5cZlO3FYU9p5xoKlNHPjbKf+omm2G4Gkxv2okriaX8hseha/wN/OBr8PVDID0EeQym7MYkPSHE2ltYi5HKATnKYum95Awe00rZlAKuhsytoR8x1jociA9j/9skcNZzvtrhc6pXUb9GnRX7yN1W0y9Kmr4d6bbsxHhygcxWHHsXhyjlTwMaEA1EECiCB2TZ9JnQFbaFRqbXLG3l1lrSos4BXLqAd9jrfgRf8AyJQ4Ks3obgkXF9Cd41EtcLVIpghmFwNzEcLcPCBNpYd7XsNLX73EgEfqBbiY6txdWWxGXjrqL+4yNh1IFsze4kdN1+Wkforlvbp8LiBIpvu0iMQtuECb5IqjQQIT0gw6npK7EUst+l5eYX9JX7f7tN2G8AkeUDP7CcvWxOJ4IBh6R5MbF2F/6T4KZeogCgbrAD3bvKVfY6iDgKLbjnqMerNfveIBI98tH58oCXSwy8OEhsupBk86r8Y2q33630gRkQg/A9ZY4R7bpHK6eGkUi247vnAU1DJUzL6rm/geI8OPvma+1jCg0KFYb0fIf5XW/wCqibCmuZWBO4Eg9QLzK/aI5+4H/wDSn/2gU/YTF37k3JTlOWdjaxWqLTrg1tAq32emcuFAYixO68N6HCWjUxGai7ut/wBYEamvAzLvh2ppWvp37jwmwNMSr7V0x6AniSBA5d2spWqK4GjLKQCdB7WYNThUbioFvfMAogGsEOCB/9k="

  },
  {
    id:'02',
    name:"Cayla Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: false,
    isTeam:true,
    phone:"0434343433"

  },
  {
    id:'03',
    name:"Cayla Brister",
    email:"caylabaris@gmail.com",
    isSuperAdmin: false,
    isTeam:true,
    phone:"0434343433"

  }
]

const UsersList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  const [addUsers, setAddUsers] = useState<boolean>(false)




  useEffect(() => {

    dispatch(fetchAllUsers())

  }, [])
  return (
    <Box>
      <Flex px={5} alignItems="center" gap="4">
        <Heading fontSize="20px" mr={5}>
          Users({users.length - 1}){" "}
        </Heading>
        <Flex
          gap={6}
          justifyContent="center"
          mt={1}
          fontSize="15px"
          color="gray.400"
        >
          <Text>All </Text>
          <Text>Super Admin (2) </Text>
          <Text>Team(3) </Text>
        </Flex>
        <Button ml="20" onClick={()=> setAddUsers(!addUsers)} colorScheme="blue" size="sm">Add Users</Button>
      </Flex>

      <Flex
        px={8}
        mt={6}
        fontSize="13px"
        fontWeight="semibold"
        color="gray.400"
        maxWidth="1000"
      >
        <Flex alignItems="center" minWidth="293">
          <Text mr={1}>SORT BY</Text>
          <Text>
            <AiOutlineCaretDown />
          </Text>
        </Flex>
        <Flex alignItems="center" minWidth="249" >
          <Text mr={1}>ROLE</Text>
          <Text>
            <AiOutlineCaretDown />
          </Text>
        </Flex>
        <Flex alignItems="center" minWidth="250" >
          <Text mr={1}>LOCATION</Text>
          <Text>
            <AiOutlineCaretDown />
          </Text>
        </Flex>
        <Flex alignItems="center" minWidth="100px">
          <Text mr={1}>AUTHENTICATION</Text>
          <Text>
            <AiOutlineCaretDown />
          </Text>
        </Flex>
      </Flex>
      <Box maxWidth="1000" mt={4} px={4} >
        
        {users && users.map((user) => (
          <UserTable user={user}/>
        ))}
      </Box>
      <AddUsers addUsers={addUsers} setAddUsers={setAddUsers}/>
    </Box>
  );
};

export default UsersList;