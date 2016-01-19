using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using EventName.Models;

namespace EventName.Hubs
{
    public class EventHub : Hub
    {
        private EventDbContext _context;
        public EventHub(EventDbContext context)
        {
            _context = context;
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public void GetData()
        {
            var list = _context.People.ToList<Person>();
            Clients.Caller.getPeople(list);
        }
        public async void UpdatePerson(Person updPerson)
        {
            _context.People.FirstOrDefault(p => p.Id == updPerson.Id).IsHere = updPerson.IsHere;
            await _context.SaveChangesAsync();

            Clients.Others.checkinOthers(updPerson);
        }

        public async void AddPerson(string firstName, string lastName)
        {
            Person person = new Person {
                FirstName = firstName,
                LastName = lastName,
                IsHere = false
            };

            //todo add to bd
            _context.People.Add(person);
            await _context.SaveChangesAsync();
        }

        public void CleanList()
        {
            // todo delete all data from db
        }
    }
}
