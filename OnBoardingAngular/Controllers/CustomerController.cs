using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnBoardingAngular.Models;

namespace OnBoardingAngular.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        //read Customer
        public JsonResult getCustomer()
        {

            using (var db = new OnboardingEntities())
            {
                var get = db.People.ToList();
                db.Configuration.LazyLoadingEnabled = false;
                return Json(get, JsonRequestBehavior.AllowGet);
            }
        }

        //add Customer
        public JsonResult addCustomer(CustomerModel model)
        {

            using (var db = new OnboardingEntities())
            {
                var getPeople = new Person();
                db.Configuration.LazyLoadingEnabled = false;
                getPeople.Name = model.Name;
                getPeople.Address1 = model.Address1;
                getPeople.Address2 = model.Address2;
                getPeople.Town_City = model.Town_City;
                try
                {
                    db.People.Add(getPeople);
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Json(new { Success = false, ErrorMsg = e.InnerException.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
        }



        //edit Customer
        public JsonResult editCustomer(CustomerModel model)
        {

            using (var db = new OnboardingEntities())
            {
                var getPeople = db.People.Find(model.Id);
             //   db.Configuration.LazyLoadingEnabled = false;
                getPeople.Name = model.Name;
                getPeople.Address1 = model.Address1;
                getPeople.Address2 = model.Address2;
                getPeople.Town_City = model.Town_City;
                try
                {   
                    
                    db.SaveChanges();
                } catch (Exception e)
                {
                    return Json(new { Success = false, ErrorMsg = e.InnerException.InnerException.Message }, JsonRequestBehavior.AllowGet);
                }
              return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        //delete Customer
        public JsonResult deleteCustomer(int Id)
        {
            using (var db = new OnboardingEntities())
            {
                var delPerson = db.People.SingleOrDefault(id => id.Id == Id);

                db.People.Remove(delPerson);
                db.SaveChanges();

                return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}