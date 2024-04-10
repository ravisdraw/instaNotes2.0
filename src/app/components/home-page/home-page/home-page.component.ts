import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  searchText:string = "";
  panelOpenState = false;

 posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      category: "Love",
      keywords: "pure, dream, marriage",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Consectetur adipiscing elit",
      category: "Life",
      keywords: "success, happiness, goals",
      notes: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      title: "Ut enim ad minim veniam",
      category: "Work",
      keywords: "career, job, professional",
      notes: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      title: "Duis aute irure dolor",
      category: "Travel",
      keywords: "adventure, explore, wanderlust",
      notes: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 5,
      title: "Sed ut perspiciatis unde omnis",
      category: "Technology",
      keywords: "innovation, development, progress",
      notes: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      id: 6,
      title: "Eaque ipsa quae ab illo",
      category: "Education",
      keywords: "learning, knowledge, growth",
      notes: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    },
    {
      id: 7,
      title: "Et harum quidem rerum",
      category: "Health",
      keywords: "wellness, fitness, nutrition",
      notes: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    },
    {
      id: 8,
      title: "Temporibus autem quibusdam",
      category: "Entertainment",
      keywords: "fun, enjoyment, leisure",
      notes: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: 9,
      title: "Itaque earum rerum hic tenetur",
      category: "Fashion",
      keywords: "style, trends, clothing",
      notes: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    },
    {
      id: 10,
      title: "Quis autem vel eum iure",
      category: "Finance",
      keywords: "money, investment, savings",
      notes: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?",
    }]
}
