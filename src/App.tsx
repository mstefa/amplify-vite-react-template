import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { Button, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { createLink } from './link-repository';

const client = generateClient<Schema>();

function deleteTodo(id: string) {
  client.models.Todo.delete({ id });
}

async function getIdToken() {
  try {
    const session = await fetchAuthSession();
    console.log(session.tokens?.accessToken.toString());
    console.log('ID Token:', session);
    return session;
  } catch (error) {
    console.error('Error getting ID token:', error);
  }
}

async function sendLink() {
  await createLink({
    id: 'atc1234',
    destination: 'https://www.youtube.com',
    title: 'youtube',
  });
}

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  getIdToken();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt('Todo content') });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <Button onClick={() => sendLink()}>Create</Button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;

// IQoJb3JpZ2luX2VjELb//////////wEaCXVzLWVhc3QtMiJHMEUCIAYPGwtm1LIkRtWXGl4McGl9efvKlcFnT34+/fmM+YM8AiEAkTrGzNldWcB4sRmg3qYCI7raEF0egCKvMZB9lVVisIcqzQQIj///////////ARADGgwyMTcyMzY4NDExMDgiDOuDNwcDhEoNSY3AQiqhBHZn+dAxbp1ZAo3AHajICEMJO73GUDNv0zAcY0c8zMgw0J0KnozjIo9VbH+kxkIi5MSWRfJz0c2LzH15xP2A9vNvGLozPAd1t1t0cN2QlDIe4a0ZQCcaI2/VFCTftRVMd7hZqJ57C2K7/yTkXlDG5DC6A52fEdD1QTiAjarYWDNP0AzCLCMKFfTh4qzJDSV3cDiFXb/nKtzG8StPooTxAwGuBeWbO7XCEx+36/JRPpHlEkVDf0rbFnRogPPkhzCMDPMnPpiWEe9X+HYwKHHhMzFLiHu/Ao0ZWyXi/dshi4D3InQkunwO53dYjuMRIyKUPDutixZPAu4HDQwWJnkjHYECLBMQiwKrTKAk802ZBEBz914k1LwiDMhTDeoywMFcML7RGTXefevlurW+sAZ95PWJb27zBU8UJGbecmo7PDa+NBTp9fgX70PPsZlMbdUY5Sw6eZfnaEYWo/Oi4FPh0BU6BFFaYSZ3eNwThrA63dxN+nWxmnhGGtGYTjlTNYvwUZGFKEBysEUF7K0oDddn5bV/HL2fSYonVrwOLypn7/cBKPlzYlYzqzA1uoA3Ul7hcwbeHmLN3oRRxS6evnUr5B2siWB0MbI7xjS54Non8d35TaWpc4gjZH0bE3R/4wzNxQLPZH7mpvFSaAhlxn+kZldhleAVmt7YetwfmTF3FewMpCelfoLP4XF69hqcdF6t5s+uXwhevnyn5m/BWZvxvRwfMLHPyrsGOoUCwqKDQYoZ20vAz5M+VVOvS1H74YBlkeAcegPIFrfKu+DTslOElVhouVfx1o3fsAiuOnR2c8YvqJDJFpWcmVV4GT/LH0P3EjX1vRFEyAD9FXRTKbRFtp2dkXg0rC4VEjVmVycR8YjgdGSOMlIlQq+Zkc1dPtVnjoS2tXbicV6/JKBnXpdqVHdMcqLn2No3fS0i4+QEKxYAm8qSjgGzDwf3FjfUW7A6FRA7K6oK4YW+xpf5D8/b3bry7iiUK+4spSlwzF/JkvQJiPhrV+LL2W9hYUluXgb2OkgTXwQfepRnVJYKW0ll3SwpdtIGDA6QIvYWhTAjnJmBH0l0g7LAH8Ipcn95DFlg
