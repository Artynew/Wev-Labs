import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response;
};


/*
vi.mock('axios');

describe('fetchData', () => {
    it('should fetch data successfully', async () => {
        // Arrange
        const mockData = [{id: 1, login: "admin"}];
        axios.get.mockResolvedValueOnce(mockData); // Mocking axios.get to resolve with mockData
        // Act
        const result = await fetchUsers();

        // Assert
        expect(result.data).toEqual(mockData.data);
        expect(result.code).toEqual(200);
    });
});
*/