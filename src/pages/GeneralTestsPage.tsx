import React, { useState, useEffect } from 'react';
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import {Category, Test} from "../common/types";
import {apiGetTests} from "../common/services/test-service";
import {TestCardList} from "../components/TestComponents/TestList";
import {apiGetCategories} from "../common/services/category-service";
import {Button} from '@mui/material'
import {CreateTestForm} from "../components/TestComponents/TestForm";

export function GeneralTestsPage() {

    const [tests, setTests] = useState<Test[]>([]);

    useEffect(() => {
        apiGetTests().then(tests=> setTests(tests)); // Функція для завантаження категорій при першому завантаженні компонента
    }, []);

    return (
        <div style={{ margin: "10px 20px" }}>
            <h1>Test Manager</h1>
            <CreateTestForm />
            <TestCardList tests={tests} />
        </div>
    );
}