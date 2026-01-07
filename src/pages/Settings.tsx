import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Globe, DollarSign, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CurrencyOption {
  id: number;
  code: string;
  name: string;
  symbol: string;
}

interface CountryOption {
  id: number;
  name: string;
  code: string;
}

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  country_id: number;
  currency_id: number;
}

export default function Settings() {
  const { userProfile, updateUserProfile } = useApp();
  const { toast } = useToast();

  const [formData, setFormData] = useState<UserProfile>({
    name: userProfile.name,
    email: userProfile.email,
    mobile: userProfile.mobile,
    dob: userProfile.dob,
    country_id: userProfile.country_id || 0,
    currency_id: userProfile.currency_id || 0,
  });
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReferenceData();
  }, []);

  const fetchReferenceData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch currencies
      const currencyResponse = await fetch(`${API_BASE_URL}/currencies/`);
      if (currencyResponse.ok) {
        const currencyData = await currencyResponse.json();
        setCurrencies(currencyData);
      }

      // Fetch countries
      const countryResponse = await fetch(`${API_BASE_URL}/countries/`);
      if (countryResponse.ok) {
        const countryData = await countryResponse.json();
        setCountries(countryData);
      }
    } catch (error) {
      console.error('Error fetching reference data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    toast({
      title: 'Success',
      description: 'Profile updated successfully',
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Mobile
              </Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Country
              </Label>
              <Select value={formData.country_id?.toString()} onValueChange={(v) => handleChange('country_id', Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Currency
              </Label>
              <Select value={formData.currency_id?.toString()} onValueChange={(v) => handleChange('currency_id', Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.id.toString()}>
                      {currency.symbol} {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSave} className="gap-2">
        <Save size={20} />
        Save Changes
      </Button>
    </div>
  );
}
