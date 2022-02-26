import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodElementProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface FoodProps extends FoodElementProps {
  id: number;
  available: boolean;
}

export function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditionfood] = useState<FoodProps>({} as FoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  async function handleAddFood(food: FoodElementProps) {    
    try {
      const { data } = await api.post('/foods', {
        ...food,
        available: true
      });

      setFoods([...foods, data]);

    } catch (err) {
      console.log(err);
    }
  }

  function handleEditFood(food: FoodProps) {
    console.log(food);
    
    //setEditionfood(food);
  }
  
  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  useEffect(() => {
    async function LoadingFoods() {
      const { data } = await api.get('/foods');      

      setFoods(data);
    }

    LoadingFoods();
  }, []);

  return (
    <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        {/* <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        /> */}

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
  );
}
