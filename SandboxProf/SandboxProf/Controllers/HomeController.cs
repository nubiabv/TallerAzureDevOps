using System.Data.SqlClient;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SandboxProf.Models;
using SandboxProf.Models.DAO;
using SandboxProf.Models.Domain;
using SqlException = Microsoft.Data.SqlClient.SqlException;

namespace SandboxProf.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        StudentDAO studentDAO;
        NationalityDAO nationalityDAO;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            //TO DO: instance studentDAO HERE
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllStudents()
        {
            studentDAO = new StudentDAO(_configuration);

            return Ok(studentDAO.Get());
        }

        public IActionResult GetStudentByEmail(string email)
        {
            studentDAO = new StudentDAO(_configuration);

            return Ok(studentDAO.Get(email));
        }

        public IActionResult DeleteStudent(string email)
        {
            try
            {
                studentDAO = new StudentDAO(_configuration);

                return Ok(studentDAO.Delete(email));
            }catch (Exception ex)
            {
                //TO DO
                return Error();
            }
            
        }

        public IActionResult UpdateStudent([FromBody] Student student)
        {
            //TODO: handle exception appropriately and send meaningful message to the view
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.Update(student));

        }

        public IActionResult Insert([FromBody] Student student)
        {
            try
            {
                studentDAO = new StudentDAO(_configuration);
                if (studentDAO.Get(student.Email).Email == null) //the student doesn't exist
                {
                    int result = studentDAO.Insert(student);
                    return Ok(result);
                }
                else
                {
                    return Error();
                }
            }
            catch (SqlException e)
            {
                //TO DO: send the most meaningful message to the front-end for the user to see
                ViewBag.Message = e.Message;
                return View(e.ToString());
            }
            
        }

        public IActionResult GetNationalities()
        {
            nationalityDAO = new NationalityDAO(_configuration);

            return Json(nationalityDAO.Get());
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
