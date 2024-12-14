import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const CookieCostCalculator = () => {
  const [language, setLanguage] = useState('en');
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: 0, unit: '', pricePerUnit: 0, costConversionFactor: 1 }
  ]);
  const [batchSize, setBatchSize] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Translations
  const translations = {
    en: {
      title: 'Cookie Cost Calculator',
      batchSize: 'Number of Cookies in Batch',
      cookingTime: 'Cooking Time',
      ingredientName: 'Ingredient Name',
      ingredientQuantity: 'Ingredient Quantity',
      unit: 'Unit',
      pricePerUnit: 'Price per Unit',
      unitConversion: 'Unit Conversion',
      addIngredient: 'Add Ingredient',
      calculateCost: 'Calculate Cost',
      costPerUnit: 'Cost per Unit',
      placeholders: {
        batchSize: 'Enter total cookies per batch',
        cookingTime: 'Total minutes to bake',
        ingredientName: 'e.g., Flour',
        quantity: 'Amount',
        unit: 'e.g., g, kg',
        price: 'Cost',
        conversion: 'Conversion'
      }
    },
    es: {
      title: 'Calculadora de Costo de Galletas',
      batchSize: 'Número de Galletas en el Lote',
      cookingTime: 'Tiempo de Cocción',
      ingredientName: 'Nombre del Ingrediente',
      ingredientQuantity: 'Cantidad de Ingrediente',
      unit: 'Unidad',
      pricePerUnit: 'Precio por Unidad',
      unitConversion: 'Conversión de Unidad',
      addIngredient: 'Añadir Ingrediente',
      calculateCost: 'Calcular Costo',
      costPerUnit: 'Costo por Unidad',
      placeholders: {
        batchSize: 'Ingrese total de galletas por lote',
        cookingTime: 'Minutos totales de horneado',
        ingredientName: 'Ej.: Harina',
        quantity: 'Cantidad',
        unit: 'Ej.: g, kg',
        price: 'Costo',
        conversion: 'Conversión'
      }
    }
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients, 
      { name: '', quantity: 0, unit: '', pricePerUnit: 0, costConversionFactor: 1 }
    ]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const calculateCost = () => {
    const totalIngredientCost = ingredients.reduce((sum, ingredient) => {
      const ingredientCost = (ingredient.quantity / ingredient.costConversionFactor) * ingredient.pricePerUnit;
      return sum + ingredientCost;
    }, 0);

    const costPerBatch = totalIngredientCost;
    const costPerUnit = costPerBatch / batchSize;

    setTotalCost(costPerUnit);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const t = translations[language];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Label htmlFor="language-switch">
            {language === 'en' ? 'English' : 'Español'}
          </Label>
          <Switch
            id="language-switch"
            checked={language === 'es'}
            onCheckedChange={() => setLanguage(language === 'en' ? 'es' : 'en')}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Batch Size and Cooking Time Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="batchSize">{t.batchSize}</Label>
              <Input 
                id="batchSize"
                type="number" 
                placeholder={t.placeholders.batchSize}
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="cookingTime">{t.cookingTime}</Label>
              <Input 
                id="cookingTime"
                type="number" 
                placeholder={t.placeholders.cookingTime}
                value={cookingTime}
                onChange={(e) => setCookingTime(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Label>{t.ingredientName}</Label>
            <Label>{t.ingredientQuantity}</Label>
            <Label>{t.unit}</Label>
            <Label>{t.pricePerUnit}</Label>
            <Label>{t.unitConversion}</Label>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-center mb-2">
              <Input 
                placeholder={t.placeholders.ingredientName}
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
              />
              <Input 
                type="number" 
                placeholder={t.placeholders.quantity}
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(index, 'quantity', Number(e.target.value))}
              />
              <Input 
                placeholder={t.placeholders.unit}
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
              />
              <Input 
                type="number" 
                placeholder={t.placeholders.price}
                value={ingredient.pricePerUnit}
                onChange={(e) => updateIngredient(index, 'pricePerUnit', Number(e.target.value))}
              />
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  placeholder={t.placeholders.conversion}
                  defaultValue={1}
                  value={ingredient.costConversionFactor}
                  onChange={(e) => updateIngredient(index, 'costConversionFactor', Number(e.target.value))}
                />
                <Button variant="destructive" onClick={() => removeIngredient(index)}>
                  {language === 'en' ? 'Remove' : 'Eliminar'}
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <Button onClick={addIngredient}>{t.addIngredient}</Button>
            <Button onClick={calculateCost}>{t.calculateCost}</Button>
          </div>

          {/* Results Display */}
          {totalCost > 0 && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p className="font-bold">{t.costPerUnit}: ${totalCost.toFixed(2)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CookieCostCalculator;
