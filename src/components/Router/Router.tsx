import { Redirect, Route, Switch } from "wouter";
import { Alphabet } from "@/pages/alphabet/Alphabet/Alphabet";
import { Practice } from "@/pages/practice/Practice";

export const Router = () => (
  <Switch>
    <Route path="/alphabet" component={Alphabet}/>
    <Route path="/practice" component={Practice}/>
    <Redirect to='/alphabet'/>
  </Switch>
)
