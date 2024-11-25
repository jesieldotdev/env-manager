import React, { useState, useEffect } from 'react';
import { addVariable, fetchVariables, removeVariable } from '../config/supabaseClient';
import EnvItem from '../components/EnvItem';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../config/auth';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { startLoading, stopLoading } from '../store/loadingReducer';

interface EnvVariable {
    id: string;
    name: string;
    value: string;
    description: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const dispatch = useDispatch();
    const [variables, setVariables] = useState<EnvVariable[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);

    function openAddEnvModal() {
        setModalOpen(true)
    }

    async function checkLoginStatus() {
        try {
            const isLoggedIn = await isUserLoggedIn();
            if (isLoggedIn) {
                console.log('Usuário está logado');
            } else {
                console.log('Usuário não está logado');
                navigate('/login');
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);
        }
    }

    const handleAddVariable = async (name: string, value: string, description: string) => {
        dispatch(startLoading());
        try {
            await addVariable(name, value, description);
            const updatedVariables = await fetchVariables();
            setVariables(updatedVariables || []);
            setModalOpen(false);
        } catch (error) {
            console.error('Error adding variable:', error);
        } finally {
            dispatch(stopLoading());
        }
    };

    const handleRemoveVariable = async (id: string) => {
        dispatch(startLoading());
        try {
            await removeVariable(id);
            const updatedVariables = await fetchVariables();
            setVariables(updatedVariables || []);
        } catch (error) {
            console.error('Error removing variable:', error);
        } finally {
            dispatch(stopLoading());
        }
    };

    useEffect(() => {
        const loadVariables = async () => {
            dispatch(startLoading());
            try {
                const data = await fetchVariables();
                setVariables(data || []);
            } catch (error) {
                console.error('Error fetching variables:', error);
            } finally {
                dispatch(stopLoading());
            }
        };

        loadVariables();
    }, [dispatch]);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <Loading show={isLoading} />
            <Header
                openAddEnvModal={openAddEnvModal}
            />
            <div className="bg-white shadow rounded divide-y">
                {variables.length > 0 ? (
                    variables.map((variable) => (
                        <EnvItem
                            key={variable.id}
                            id={variable.id}
                            name={variable.name}
                            value={variable.value}
                            description={variable.description}
                            handleRemoveVariable={handleRemoveVariable}
                        />
                    ))
                ) : (
                    <p className="p-4 text-gray-500 text-center">No variables added yet.</p>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddVariable}
            />
        </div>
    );
};

export default Home;
