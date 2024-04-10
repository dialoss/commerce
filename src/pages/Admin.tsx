//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';


export const MyAdmin = () => (
    <Admin dataProvider={restProvider("https://api.userfront.com/v0/tenants/8nwwwqpn/users/")}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);