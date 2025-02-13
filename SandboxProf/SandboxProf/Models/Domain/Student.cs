namespace SandboxProf.Models.Domain
{
    public class Student
    {
        private int id;
        private string name;
        private string email;
        private string password;
        private Nationality nationality;

        public Student(int id, string name, string email, string password, Nationality nationality)
        {
            this.Id = id;
            this.name = name;
            this.email = email;
            this.password = password;
            this.Nationality = nationality;
        }

        public Student()
        {

        }

        //Propiedades
        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public Nationality Nationality { get => nationality; set => nationality = value; }
        
    }
}
