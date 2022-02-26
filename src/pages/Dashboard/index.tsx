import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

export function Dashboard() {
  const [foods, setFoods] = useState<any[]>([]);
  const [editingFood, setEditionfood] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  async function handleAddFood(food: FoodProps) {
    console.log("FOOD:", food);
    
    // try {
    //   const { data } = await api.post('/foods', {
    //     ...food,
    //     available: true
    //   });

    //   setFoods([...foods, data]);

    // } catch (err) {
    //   console.log(err);
    // }
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

        {/* <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                // handleDelete={this.handleDeleteFood}
                // handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer> */}
      </>
  );
}
