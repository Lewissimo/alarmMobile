import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase'; // Ensure Firestore is initialized here
import { doc, getDoc, collection, query, getDocs, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export type Device = {
  id: string;
  name: string;
  nayax_id: string;
  phoneNum: string;
  place: string;
  seal: string;
  user_id: string[];
};

type UserData = {
  f_name: string;
  l_name: string;
  email: string;
  photoUrl: string;
  devices: Device[];
  setDeviceData: (id: string, name: string | null, nayax_id: string | null, phoneNum: string | null, place: string | null, seal: string | null) => void;
};

type AuthContextType = {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  userData: null, 
  loading: true, 
  logout: async () => {},
  changePassword: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userDocData = userDoc.data();
          const devices: Device[] = [];

          const q = query(collection(db, 'devices'));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const deviceData = doc.data();
            if (deviceData.user_id.includes(currentUser.uid)) {
              devices.push({ ...deviceData, id: doc.id } as Device);
            }
          });

          const storage = getStorage();
          const photoRef = ref(storage, userDocData.photoUrl);
          const photoUrl = await getDownloadURL(photoRef);

          const fetchedUserData: UserData = {
            f_name: userDocData.f_name,
            l_name: userDocData.l_name,
            email: userDocData.email,
            photoUrl,
            devices,
            setDeviceData: async (id: string, name: string | null, nayax_id: string | null, phoneNum: string | null, place: string | null, seal: string | null) => {
              const deviceDocRef = doc(db, 'devices', id);
              const updatedData: Partial<Device> = {};
              if (name !== null) updatedData.name = name;
              if (nayax_id !== null) updatedData.nayax_id = nayax_id;
              if (phoneNum !== null) updatedData.phoneNum = phoneNum;
              if (place !== null) updatedData.place = place;
              if (seal !== null) updatedData.seal = seal;

              await updateDoc(deviceDocRef, updatedData);

              setUserData((prevData) => {
                if (!prevData) return prevData;

                const updatedDevices = prevData.devices.map((device) => 
                  device.id === id ? { ...device, ...updatedData } : device
                );
                return { ...prevData, devices: updatedDevices };
              });
            }
          };

          setUserData(fetchedUserData);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (user) {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert('Password changed successfully');
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
