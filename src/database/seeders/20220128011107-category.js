module.exports = {
  async up(QueryInterface) {
    return QueryInterface.bulkInsert(
      'categories',
      [
        {
          description: 'Geral',
          id_user: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Diversão',
          id_user: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Combustível',
          id_user: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Internet',
          id_user: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {
    '';
  },
};
